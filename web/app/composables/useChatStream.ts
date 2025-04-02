import { ref, type Ref } from 'vue';
import type { ChatStreamOptions, Message } from '~~/types/ChatTypes';

/**
 * Composable to handle chat streaming functionality
 * @param defaultOptions Default options for chat streaming
 */
export function useChatStream(defaultOptions: ChatStreamOptions) {
  // State
  const messages: Ref<Message[]> = ref([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Format text to properly display code blocks with syntax highlighting
   * @param text Text containing code blocks
   * @returns Formatted HTML with styled code blocks
   */
  const formatCodeBlocks = (text: string): string => {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    
    return text.replace(codeBlockRegex, (match, lang, code) => {
      // Escape HTML to prevent XSS
      const escapedCode = code.trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      return `<pre class="bg-gray-900 text-white font-mono p-4 border border-gray-800 rounded-lg whitespace-pre-wrap break-words"><code class="language-${lang || 'plaintext'}">${escapedCode}</code></pre>`;
    });
  };

  /**
   * Process a streaming response, updating the message incrementally
   * @param response The streaming response object
   * @param botMessage The bot message object to update
   */
  const processStreamResponse = async (response: any, botMessage: Message): Promise<void> => {
    const reader = response.data.value.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const decodedText = decoder.decode(value, { stream: true });
        const jsonChunks = decodedText.trim().split("\n");

        for (const chunk of jsonChunks) {
          if (!chunk) continue;

          try {
            const parsedData = JSON.parse(chunk);
            if (parsedData.event === "token" && parsedData.data?.chunk) {
              botMessage.text += parsedData.data.chunk === "\n" ? "<br />" : parsedData.data.chunk;
              botMessage.text = formatCodeBlocks(botMessage.text);
              messages.value = [...messages.value]; // Trigger reactivity
            }
          } catch (e) {
            console.error("Error parsing JSON chunk:", e, chunk);
          }
        }
      }
    } catch (streamError) {
      console.error("Error processing stream:", streamError);
      throw streamError;
    }
  };

  /**
   * Process a non-streaming response
   * @param responseData The response data
   * @returns Processed bot message
   */
  const processNonStreamResponse = (responseData: any): Message => {
    const botMessage: Message = { 
      text: '', 
      sender: 'bot', 
      imageUrl: null 
    };
    
    // Extract text response
    botMessage.text = responseData.outputs?.[0]?.outputs?.[0]?.results?.message?.text || 'No response received.';
    botMessage.text = formatCodeBlocks(botMessage.text).replace(/\n/g, '<br>');
    
    // Extract image URL if present
    const contentBlocks = responseData.outputs?.[0]?.outputs?.[0]?.results?.message?.content_blocks;
    if (Array.isArray(contentBlocks)) {
      const mediaBlock = contentBlocks.find(block => 
        Array.isArray(block.contents) &&
        block.contents.some((content: { type: string; urls: string | any[]; }) => 
          content.type === 'media' && Array.isArray(content.urls) && content.urls.length > 0
        )
      );
    
      if (mediaBlock) {
        const mediaContent = mediaBlock.contents.find((content: { type: string; }) => content.type === 'media');
        if (mediaContent && mediaContent.urls.length > 0) {
          botMessage.imageUrl = "http://localhost:7860" + mediaContent.urls[0];
        }
      }
    }
    
    return botMessage;
  };

  /**
   * Prepare the request payload and options
   * @param userInput User input text
   * @param flowId Flow ID for the request
   * @param options Request options
   * @param tweaks Optional tweaks for the request
   * @returns Request URL and fetch options
   */
  const prepareRequest = (
    userInput: string, 
    flowId: string, 
    options: ChatStreamOptions, 
    tweaks?: Record<string, string>
  ): { url: string, fetchOptions: RequestInit } => {
    // Prepare URL
    let langflowUrl = options.url;
    if (options.stream) {
      langflowUrl += "?stream=true";
    }
    
    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      body: JSON.stringify({
        body: {
          input_value: userInput,
          output_type: "chat",
          input_type: "chat",
        },
        tweaks: tweaks,
        flow_id: flowId,
      })
    };
    
    return { url: langflowUrl, fetchOptions };
  };

  /**
   * Send a message to the chat API
   * @param userInput Text input from the user
   * @param flowId Flow ID for the request
   * @param customOptions Optional custom options to override defaults
   * @param tweaks Optional tweaks for the request
   */
  const sendMessage = async (
    userInput: string, 
    flowId: string, 
    customOptions?: Partial<ChatStreamOptions>, 
    tweaks?: Record<string, string>
  ): Promise<void> => {
    // Merge options
    const options: ChatStreamOptions = {
      ...defaultOptions,
      ...customOptions
    };

    // Add user message to the list
    const userMessage: Message = { text: userInput, sender: 'User', imageUrl: null };
    messages.value.push(userMessage);

    // Reset state
    error.value = null;
    isLoading.value = true;

    try {
      // Prepare and send request
      const { url, fetchOptions } = prepareRequest(userInput, flowId, options, tweaks);
      const response = await useSanctumFetch(url, fetchOptions);

      if (!response.data) {
        throw new Error("No response body");
      }

      if (options.stream === false) {
        // Handle non-streaming response
        const responseData = await response.data.value;
        const botMessage = processNonStreamResponse(responseData);
        messages.value.push(botMessage);
      } else {
        // Handle streaming response
        const botMessage: Message = { text: '', sender: 'bot', imageUrl: null };
        messages.value.push(botMessage);
        await processStreamResponse(response, botMessage);
      }
    } catch (fetchError) {
      console.error('Error:', fetchError);
      error.value = 'Error retrieving response.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    error
  };
}