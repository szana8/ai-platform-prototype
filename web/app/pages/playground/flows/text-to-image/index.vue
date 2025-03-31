<script setup lang="ts">
import { InputLabel } from '#components';
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
    url: "http://localhost:8090/api/text-to-image",
    stream: true, // Enable streaming by default
    headers: {
        // Any additional default headers
    }
}

const prompt = ref('')
const isStreamEnabled = ref(false)
let isSettingsOpen = ref(false)
const { messages, sendMessage, isLoading, error } = useChatStream(defaultOptions)

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

// Settings handler
const toogleSetup = () => {
    // Handle opening settings modal or configuration
    isSettingsOpen.value = !isSettingsOpen.value
};

</script>

<template>
    <div class="relative h-screen">
        <div class="relative w-full space-y-4 h-full overflow-auto flex space-x-2">
            <div class="w-1/4">
                <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0 -translate-x-full"
                    enter-to-class="opacity-100 translate-x-0" leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">
                    <ChatSettings v-if="isSettingsOpen" class="border-r border-gray-200 h-full" />
                </transition>

            </div>
            <div class="w-1/2">
                <ChatContainer :messages="messages" :error="error" :is-loading="isLoading"
                    :is-stream-enabled="isStreamEnabled" />

                <div class="left-1/2 w-full">
                    <div class="relative max-w-3xl left-1/2 transform -translate-x-1/2 bottom-0">
                        <ChatInput v-model="prompt" :is-stream-enabled="isStreamEnabled" :is-loading="isLoading"
                            :setting-is-open="isSettingsOpen" @submit="submit" @toggle-setup="toogleSetup" />
                    </div>
                </div>
            </div>
            <div class="w-1/4"></div>
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