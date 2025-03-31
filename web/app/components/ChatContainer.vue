<script setup lang="ts">
import type { Message } from '~~/types/ChatTypes';

const props = defineProps<{
    messages: Message[],
    isLoading: Boolean,
    isStreamEnabled: Boolean,
    error: String | null,
}>();
</script>

<template>
    <div ref="messagesContainer" class="space-y-2 h-4/6 max-h-5/6 overflow-y-auto scroll-smooth">
        <div v-for="(message, index) in props.messages" :key="index"
            :class="message.sender === 'User' ? 'justify-end flex' : 'justify-start flex'">
            <div>
                <div :class="message.sender === 'User'
                    ? 'bg-gray-100 text-gray-800 dark:text-gray-900 p-3 rounded-2xl'
                    : 'text-gray-800 dark:text-white p-3'" v-html="message.text">
                </div>

                <div v-if="message.imageUrl">
                    <img :src="message.imageUrl" alt="Generated Image"
                        class="chat-image w-1/2 rounded-xl flex justify-center" />
                </div>
            </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="props.isLoading && !props.isStreamEnabled" class="justify-start flex">
            <span class="dots-animation text-3xl"></span>
        </div>

        <!-- Error handling -->
        <div v-if="props.error" class="text-red-500 text-center justify-start flex">
            {{ props.error }}
        </div>
    </div>
</template>

<style scoped>
pre {
    background-color: #2d2d2d;
    color: #f8f8f2;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    padding: 10px;
    border-radius: 6px;
    overflow-x: auto;
    margin-top: 8px;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.code-style {
    font-family: 'Courier New', monospace;
    font-size: 0.95em;
    color: #f8f8f2;
    background-color: #272822;
    padding: 3px 6px;
    border-radius: 4px;
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