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
    //url: "http://localhost:7860/api/v1/run/1570a19c-f16a-445f-bc7c-8a10f369c80c",
    url: "http://localhost:8090/api/chat",
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
    <div class="px-10 relative h-screen">
        <div class="relative w-full space-y-4 h-4/6 max-h-4/6 overflow-auto">
            <div class="w-3/6 mx-auto">
                <div ref="messagesContainer" class="space-y-2 h-4/6 max-h-5/6 overflow-y-auto">
                    <div v-for="(message, index) in messages" :key="index"
                        :class="message.sender === 'User' ? 'justify-end flex' : 'justify-start flex'">
                        <div :class="message.sender === 'User'
                            ? 'bg-gray-100 text-gray-800 dark:text-gray-900 p-3 rounded-2xl'
                            : 'text-gray-800 dark:text-white p-3'" v-html="message.text">
                        </div>
                    </div>

                    <!-- Loading indicator -->
                    <div v-if="isLoading && !isStreamEnabled" class="justify-start flex">
                        <span class="dots-animation text-3xl"></span>
                    </div>

                    <!-- Error handling -->
                    <div v-if="error" class="text-red-500 text-center justify-start flex">
                        {{ error }}
                    </div>
                </div>
            </div>
        </div>
        <div class="left-1/2 w-full h-2/6">
            <div class="relative max-w-3xl left-1/2 transform -translate-x-1/2 bottom-16">
                <textarea rows="6" v-model="prompt" :disabled="isLoading"
                    class="w-full mt-20 p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none resize-none placeholder-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white"
                    @keyup.enter="submit" placeholder="Type a message..."></textarea>
                <div>
                    <div class="absolute bottom-5 left-4">
                        <div class="flex space-x-5 items-center">
                            <div>
                                <label class="inline-flex items-center cursor-pointer">
                                    <span class="mr-2 text-xs text-gray-600">Stream</span>
                                    <input type="checkbox" v-model="isStreamEnabled" class="sr-only peer">
                                    <div
                                        class="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
                                    </div>
                                </label>
                            </div>
                            <div>
                                <button
                                    class="flex space-x-1 text-xs border border-gray-200 text-gray-600 px-2 py-1.5 rounded-2xl dark:hover:bg-gray-300 dark:hover:text-gray-700 hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <div>Setup</div>
                                </button>
                            </div>
                        </div>
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