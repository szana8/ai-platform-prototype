<script setup lang="ts">
import { ref } from 'vue';
import type { ChatStreamOptions } from '~~/types/ChatTypes';

definePageMeta({
    middleware: ['sanctum:auth'],
    layout: "default",
    title: "Playground - Text to image"
})

const prompt = ref('')
const isStreamEnabled = ref(false)
let isSettingsOpen = ref(false)
const llm = ref<string>('smollm:135m')
const systemPrompt = ref<string>('')


const defaultOptions: ChatStreamOptions = {
    url: "http://localhost:8090/api/flow/run",
    stream: false,
    headers: {
        // ...
    }
}
const { messages, sendMessage, isLoading, error } = useChatStream(defaultOptions)

const submit = async () => {
    if (prompt.value.trim() === '') return;

    let request_prompt = prompt.value
    prompt.value = '';

    await sendMessage(
        request_prompt,
        '7ae99595-acc7-4b99-90e5-0c96bb6c7e97',
        { stream: isStreamEnabled.value },
        {
            systemPrompt: systemPrompt.value,
            llm: llm.value
        }
    );
};

const toogleSetup = () => {
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