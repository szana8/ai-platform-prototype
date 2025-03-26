<script setup lang="ts">
import { ref } from 'vue';

const prompt = ref('');
const messages = ref<Message[]>([]);
const messagesContainer = ref<HTMLDivElement | null>(null);


const submit = async () => {
    if (prompt.value.trim() === '') return;

    const userMessage = { text: prompt.value, sender: 'User' };
    messages.value.push(userMessage);
    const userInput = prompt.value;
    prompt.value = '';

    try {
        const response = await fetch(
            "http://localhost:7860/api/v1/run/1570a19c-f16a-445f-bc7c-8a10f369c80c?stream=true",
            {
                method: "POST",
                headers: {
                    //"Authorization": "Bearer <TOKEN>",
                    "Content-Type": "application/json",
                    //"x-api-key": "<your api key>"
                },
                body: JSON.stringify({
                    input_value: userInput,
                    output_type: "chat",
                    input_type: "chat",
                    tweaks: {
                        "ChatInput-2d2PO": {},
                        "Prompt-5p93M": {},
                        "ChatOutput-aKJsa": {},
                        "OllamaModel-xX8ui": {}
                    }
                })
            }
        );

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let botMessage = { text: '', sender: 'bot' };
        messages.value.push(botMessage);

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const decodedText = decoder.decode(value, { stream: true });
            const jsonChunks = decodedText.trim().split("\n");
            console.log(jsonChunks)

            for (const chunk of jsonChunks) {
                try {
                    const parsedData = JSON.parse(chunk);
                    if (parsedData.event === "token" && parsedData.data?.chunk) {
                        if (parsedData.data.chunk == "\n") {
                            botMessage.text += "<br />";
                        } else {
                            botMessage.text += parsedData.data.chunk;
                        }
                        messages.value = [...messages.value]; // Trigger Vue reactivity
                    }
                } catch (e) {
                    console.error("Error parsing JSON chunk:", e);
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
        messages.value.push({ text: 'Error retrieving response.', sender: 'bot' });
    }
};

// Watch for changes in messages to scroll to bottom
watchEffect(() => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
});
</script>

<template>
    <div class="py-5 px-10 relative h-screen">
        <div class="relative w-full space-y-4 h-4/6 max-h-4/6 overflow-auto">
            <div class="w-3/6 mx-auto">
                <div ref="messagesContainer" class="space-y-2 h-4/6 max-h-5/6 overflow-y-auto">
                    <div v-for="message in messages" v-if="messages"
                        :class="message.sender === 'User' ? 'justify-end flex' : 'justify-start flex'">
                        <div :class="message.sender === 'User' ? 'bg-gray-100 text-gray-800 dark:text-gray-900 p-3 rounded-lg' : 'text-gray-800 dark:text-white p-3 rounded-lg'"
                            v-html="message.text">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="left-1/2 w-full h-2/6">
            <!-- Textarea Container -->
            <div class="relative max-w-3xl left-1/2 transform -translate-x-1/2">
                <!-- The textarea itself -->
                <textarea rows="6" v-model="prompt"
                    class="w-full mt-20 p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none resize-none placeholder-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white"
                    @keyup.enter="submit" placeholder="Type a message..."></textarea>

                <!-- Optional: You can add a submit button or other features here -->
                <button v-on:click="submit"
                    class="absolute right-4 bottom-4 bg-blue-500 text-white p-2 rounded-full focus:outline-none hover:bg-blue-600 dark:hover:bg-gray-400 dark:bg-white dark:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M17.707 10.707a1 1 0 0 0 0-1.414l-5-5a1 1 0 0 0-1.414 1.414L15.586 9H3a1 1 0 0 0 0 2h12.586l-4.293 4.293a1 1 0 1 0 1.414 1.414l5-5z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>