<script setup lang="ts">
</script>

<template>
    <div class="flex space-x-10">
        <NuxtLink :to="'playground/flows/text-to-image'"
            class="w-1/2 bg-cover bg-[url(/assets/imagination.webp)] h-[400px] rounded-xl grayscale hover:grayscale-0 hover:cursor-pointer flex items-center">
            <div class="text-3xl text-white font-extrabold p-8">Imagination</div>
        </NuxtLink>
        <div
            class="w-1/2 bg-cover bg-[url(/assets/diarization.webp)] h-[400px] rounded-xl grayscale hover:grayscale-0 hover:cursor-pointer flex items-center">
            <div class="text-3xl text-white font-extrabold p-8">Diarization</div>
        </div>
    </div>
</template>