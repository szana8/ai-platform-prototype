<script setup lang="ts">
defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="overflow-x-auto w-[500px] h-24 dark:bg-white bg-gray-800 rounded-xl p-4 shadow flex items-center space-x-4">
        <div class="absolute inset-0 bg-black animate-scroll"></div>
        <div class="absolute flex items-center justify-center text-white space-x-4">
            <div id="notification-icon" class="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-green-600 bg-gray-950 rounded-full">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <div class="text-white text-normal">
                <p class="">Message sent to the backend.</p>
                <p class="text-sm">Changes will take effect</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-scroll {
    animation: scroll 1s infinite linear;
}

@keyframes scroll {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}
</style>