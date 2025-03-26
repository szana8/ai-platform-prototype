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

    return text.replace(codeBlockRegex, (match, lang, code) => {
      // Trim the code and escape HTML to prevent XSS
      const escapedCode = code.trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Return a formatted code block
      return `<pre><code class="language-${lang || 'plaintext'}">${escapedCode}</code></pre>`;
    });
  };

const streamResponse = async (response: any, botMessage: any) => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const decodedText = decoder.decode(value, { stream: true });
    const jsonChunks = decodedText.trim().split("\n");

    console.log("JSON Chunk: ", jsonChunks)

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

  const sendMessage = async (userInput: string, customOptions?: Partial<ChatStreamOptions>) => {
    const options: ChatStreamOptions = {
      ...defaultOptions,
      ...customOptions
    };

    const userMessage: Message = { text: userInput, sender: 'User' };
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
          input_type: "chat"
        })
      };

      let langflow_url = options.url
      if (options.stream) {
        langflow_url += "?stream=true"
      }

      const response = await fetch(langflow_url, fetchOptions);

      if (!response.body) throw new Error("No response body");

      let botMessage: Message = { text: '', sender: 'bot' };
      messages.value.push(botMessage);

      if (options.stream === false) {
        const responseData = await response.json();
        
        botMessage.text = responseData.outputs[0].outputs[0].results.message.text.replace(/\n/g, '<br>') || 'No response received.';
        
        botMessage.text = formatCodeBlocks(botMessage.text);
      } else {
          await streamResponse(response, botMessage)
      }
    } catch (fetchError) {
      console.error('Error:', fetchError);
      error.value = 'Error retrieving response.';
      messages.value.push({ text: error.value, sender: 'bot' });
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