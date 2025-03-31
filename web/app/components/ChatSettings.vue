<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
    llm: {
        type: String
    },
    systemPrompt: {
        type: String
    }
});

const emit = defineEmits(['updateSystemPrompt', 'cancelSystemPrompt'])

const systemPrompt = ref(props.systemPrompt)
const localLlm = ref(props.llm)

watch(() => props.systemPrompt, (newVal) => {
    systemPrompt.value = newVal;
});

watch(() => props.llm, (newVal) => {
    localLlm.value = newVal;
})

const updateSystemPrompt = () => {
    emit('updateSystemPrompt', systemPrompt.value, localLlm.value);
};

const cancelSystemPrompt = () => {
    emit('cancelSystemPrompt', systemPrompt.value, localLlm.value);
}
</script>

<template>
    <div class="px-4 space-y-4">
        <div class="w-full font-serif text-2xl font-light">
            <h3>Settings</h3>
        </div>
        <div class="flex items-center pt-2 space-x-8 border-t border-gray-200 justify-between">
            <div>
                <InputLabel :value="'Model'" />
            </div>
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <select v-model="localLlm"
                        class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm rounded pl-3 pr-8 py-2 transition duration-300 ease hover:bg-gray-200 focus:outline-none appearance-none cursor-pointer">
                        <option value="smollm:135m">Smollm</option>
                        <option value="llama3.1:latest">llama3.1</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2"
                        stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="flex items-center pt-2 space-x-8 border-t border-gray-200 justify-between">
            <div>
                <InputLabel :value="'Settings'" />
            </div>
            <div class="flex items-center space-x-4">
                <div class="text-xs">
                    text.format: <span class="text-green-500">text</span> temp: <span class="text-green-500">1.00</span>
                    tokens: <span class="text-green-500">2048</span> top_p: <span class="text-green-500">1.00</span>
                    store: <span class="text-green-500">true</span>
                </div>
                <button class="hover:bg-gray-200 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="items-center space-y-4 py-2 border-t border-gray-200">
            <div>
                <InputLabel :value="'System Message'" />
            </div>
            <div class="relative">
                <textarea name="system_prompt" id="system_prompt" rows="10" v-model="systemPrompt"
                    class="w-full p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none resize-none placeholder-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white"></textarea>
            </div>
        </div>
        <div class="space-x-4 text-right">
            <SecondaryButton @click="cancelSystemPrompt">Cancel</SecondaryButton>
            <PrimaryButton @click="updateSystemPrompt">Save</PrimaryButton>
        </div>
    </div>
</template>