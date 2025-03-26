<script setup lang="ts">
import { ref } from 'vue';
import type { ChatStreamOptions } from '~~/types/ChatTypes';


definePageMeta({
    middleware: ['sanctum:auth'],
    layout: "default",
    title: "Playground - Text to image"
})

// Default configuration
const defaultOptions: ChatStreamOptions = {
    url: "http://localhost:7860/api/v1/run/1570a19c-f16a-445f-bc7c-8a10f369c80c",
    stream: true, // Enable streaming by default
    headers: {
        // Any additional default headers
    }
}

const prompt = ref('');
const isStreamEnabled = ref(false);
const { messages, sendMessage, isLoading, error } = useChatStream(defaultOptions);

const submit = async () => {
    // Prevent empty submissions
    if (prompt.value.trim() === '') return;

    let tmp = prompt.value
    prompt.value = '';

    // Send message with optional stream configuration
    await sendMessage(tmp, {
        stream: isStreamEnabled.value
    });
};
</script>

<template>
    <div class="py-5 px-10 relative h-screen">
        <div class="relative w-full space-y-4 h-4/6 max-h-4/6 overflow-auto">
            <div class="w-3/6 mx-auto">
                <div ref="messagesContainer" class="space-y-2 h-4/6 max-h-5/6 overflow-y-auto">
                    <div v-for="(message, index) in messages" :key="index"
                        :class="message.sender === 'User' ? 'justify-end flex' : 'justify-start flex'">
                        <div :class="message.sender === 'User'
                            ? 'bg-gray-100 text-gray-800 dark:text-gray-900 p-3 rounded-lg'
                            : 'text-gray-800 dark:text-white p-3 rounded-lg'" v-html="message.text">
                        </div>
                    </div>

                    <!-- Loading indicator -->
                    <div v-if="isLoading && !isStreamEnabled" class="justify-start flex">
                        <span class="dots-animation text-3xl"></span>
                    </div>

                    <!-- Error handling -->
                    <div v-if="error" class="text-red-500 text-center">
                        {{ error }}
                    </div>
                </div>
            </div>
        </div>
        <div class="left-1/2 w-full h-2/6">
            <div class="relative max-w-3xl left-1/2 transform -translate-x-1/2">
                <textarea rows="6" v-model="prompt" :disabled="isLoading"
                    class="w-full mt-20 p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none resize-none placeholder-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white"
                    @keyup.enter="submit" placeholder="Type a message..."></textarea>
                <div>
                    <div class="absolute bottom-5 left-4">
                        <label class="inline-flex items-center cursor-pointer">
                            <span class="mr-2 text-xs">Stream</span>
                            <input type="checkbox" v-model="isStreamEnabled" class="sr-only peer">
                            <div
                                class="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
                            </div>
                        </label>
                    </div>
                    <button @click="submit" :disabled="isLoading"
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
    </div>
</template>

<style scoped>
pre {
    background-color: #f4f4f4;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    overflow-x: auto;
}

code {
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

.dots-animation::after {
    content: "";
    display: inline-block;
    animation: dots 1.5s infinite steps(3);
}

@keyframes dots {
    0% {
        content: ".";
    }

    33% {
        content: "..";
    }

    66% {
        content: "...";
    }
}
</style>