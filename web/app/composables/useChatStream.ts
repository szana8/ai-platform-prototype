import { ref, type Ref } from 'vue';
import type { ChatStreamOptions, Message } from '~~/types/ChatTypes';

export function useChatStream(defaultOptions: ChatStreamOptions) {
  const messages: Ref<Message[]> = ref([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Function to format code blocks
  const formatCodeBlocks = (text: string): string => {
    // Regex to detect code blocks (```language or just ```)
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;

    console.log(codeBlockRegex)

    return text.replace(codeBlockRegex, (match, lang, code) => {
      // Trim the code and escape HTML to prevent XSS
      const escapedCode = code.trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      console.log(escapedCode)

      // Return a formatted code block
      return `<pre class="bg-gray-900 text-white font-mono p-4 border border-gray-800 rounded-lg whitespace-pre-wrap break-words"><code class="language-${lang || 'plaintext'}">${escapedCode}</code></pre>`;
    });
  };

const streamResponse = async (response: any, botMessage: any) => {
  const reader = response.data.value.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const decodedText = decoder.decode(value, { stream: true });
    const jsonChunks = decodedText.trim().split("\n");

    for (const chunk of jsonChunks) {
      try {
        if (!chunk) continue;

        const parsedData = JSON.parse(chunk);
        if (parsedData.event === "token" && parsedData.data?.chunk) {
          if (parsedData.data.chunk == "\n") {
            botMessage.text += "<br />";
          } else {
            botMessage.text += parsedData.data.chunk;
          }

          botMessage.text = formatCodeBlocks(botMessage.text);
          messages.value = [...messages.value];
        }
      } catch (e) {
        console.error("Error parsing JSON chunk:", e);
      }
    }
  }
}

  const sendMessage = async (userInput: string, customOptions?: Partial<ChatStreamOptions>, tweaks?: Record<string, string>) => {

    const options: ChatStreamOptions = {
      ...defaultOptions,
      ...customOptions
    };

    const userMessage: Message = { text: userInput, sender: 'User', imageUrl: null };
    messages.value.push(userMessage);

    error.value = null;
    isLoading.value = true;

    try {
      const fetchOptions: RequestInit = {
        method: options.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        body: JSON.stringify({
          input_value: userInput,
          output_type: "chat",
          input_type: "chat",
          tweaks: tweaks
        })
      };

      let langflow_url = options.url
      if (options.stream) {
        langflow_url += "?stream=true"
      }

      const response = await useSanctumFetch(langflow_url, fetchOptions);

      if (!response.data) throw new Error("No response body");

      let botMessage: Message = { text: '', sender: 'bot', imageUrl: null };
      messages.value.push(botMessage);

      if (options.stream === false) {
        const responseData: any = await response.data.value;
        botMessage.text = responseData.outputs[0].outputs[0].results.message.text || 'No response received.';

        botMessage.text = formatCodeBlocks(botMessage.text);
        botMessage.text.replace(/\n/g, '<br>')

        const contentBlocks = responseData.outputs[0].outputs[0].results.message.content_blocks;
        if (Array.isArray(contentBlocks)) {
          const mediaBlock = contentBlocks.find(block => 
            Array.isArray(block.contents) &&
            block.contents.some((content: { type: string; urls: string | any[]; }) => content.type === 'media' && Array.isArray(content.urls) && content.urls.length > 0)
          );
        
          if (mediaBlock) {
            const mediaContent = mediaBlock.contents.find((content: { type: string; }) => content.type === 'media');
            if (mediaContent && mediaContent.urls.length > 0) {
              botMessage.imageUrl = "http://localhost:7860"+mediaContent.urls[0];
              console.log("Media Image URL Found:", botMessage.imageUrl);
            }
          }
        }
      } else {
          await streamResponse(response, botMessage)
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