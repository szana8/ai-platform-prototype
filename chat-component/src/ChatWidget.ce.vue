<script setup lang="ts">
import ChatTrigger from './components/ChatTrigger.vue';

defineProps({
    start_open: {
        type: Boolean,
        default: false,
    },
    api_key: {
        type: [String, null],
    },
    host_url: {
        type: String,
        required: true
    },
    flow_id: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="relative">
        <ChatTrigger />
    </div>
</template>

<style scoped></style>