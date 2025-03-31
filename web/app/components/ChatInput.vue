<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    isStreamEnabled: {
        type: Boolean,
        default: true
    },
    settingIsOpen: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'update:isStreamEnabled', 'submit', 'toggleSetup', 'fileUpload']);

const promptRef = ref<HTMLTextAreaElement | null>(null);
const localPrompt = ref(props.modelValue);
const localStreamEnabled = ref(props.isStreamEnabled);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Sync props with local state
watch(() => props.modelValue, (newValue) => {
    localPrompt.value = newValue;
});

watch(() => props.isStreamEnabled, (newValue) => {
    localStreamEnabled.value = newValue;
});

// Sync local state with parent
watch(localPrompt, (newValue) => {
    emit('update:modelValue', newValue);
});

watch(localStreamEnabled, (newValue) => {
    emit('update:isStreamEnabled', newValue);
});

onMounted(() => {
    if (promptRef.value && promptRef.value.hasAttribute('autofocus')) {
        promptRef.value.focus();
    }
});

const handleSubmit = () => {
    if (localPrompt.value && localPrompt.value.trim()) {
        emit('submit', localPrompt.value);
    }
};

const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
};

const toggleSetup = () => {
    emit('toggleSetup');
};

// Handle File Upload
const handleFileUpload = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
        emit('fileUpload', files[0]); // Emit the file to parent component
    }
};

const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = false;

    if (event.dataTransfer?.files.length) {
        emit('fileUpload', event.dataTransfer.files[0]); // Emit the file
    }
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = true;
};

const handleDragLeave = () => {
    isDragging.value = false;
};
</script>

<template>
    <div class="relative">
        <textarea rows="6" ref="promptRef" v-model="localPrompt" :disabled="isLoading"
            class="w-full mt-20 p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none resize-none placeholder-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white"
            @keyup="handleKeyup" placeholder="Type a message..." @dragover="handleDragOver" @dragleave="handleDragLeave"
            @drop="handleDrop"></textarea>

        <div v-if="isDragging"
            class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 text-gray-700 border-2 border-dashed border-gray-400">
            Drop your file here
        </div>

        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />

        <div class="absolute bottom-5 left-4">
            <div class="flex space-x-3 items-center">
                <!-- Stream Toggle -->
                <div>
                    <label class="inline-flex items-center cursor-pointer">
                        <span class="mr-2 text-xs text-gray-600">Stream</span>
                        <input type="checkbox" v-model="localStreamEnabled" class="sr-only peer">
                        <div
                            class="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
                        </div>
                    </label>
                </div>

                <!-- Settings Button -->
                <button :class="['flex space-x-1 text-xs border border-gray-200 text-gray-600 px-2 py-1.5 rounded-2xl dark:hover:bg-gray-300 dark:hover:text-gray-700 hover:bg-gray-100 bg-white',
                    { 'bg-red-200': props.settingIsOpen }]" @click="toggleSetup">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <div>Settings</div>
                </button>

                <label
                    class="cursor-pointer text-xs border border-gray-200 text-gray-600 px-2 py-1.5 rounded-2xl dark:hover:bg-gray-300 dark:hover:text-gray-700 hover:bg-gray-100 bg-white">
                    Upload File
                    <input type="file" class="hidden" @change="handleFileUpload" />
                </label>

            </div>
        </div>
    </div>
</template>
