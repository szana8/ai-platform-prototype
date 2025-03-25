<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps({
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const input = ref()

onMounted(() => {
    if (input.value && input.value.hasAttribute('autofocus')) {
        input.value?.focus()
    }
})

defineExpose({ focus: () => input.value?.focus() })
</script>

<template>
    <input
        ref="input"
        class="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm p-2"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>