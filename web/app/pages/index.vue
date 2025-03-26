<script setup lang="ts">
definePageMeta({
    middleware: [],
    layout: 'empty',
});

const logos = [
    { link: "https://ollama.com/public/og.png", alt: "Ollama" },
    { link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sdA9_gDl2IPpUpEghok54n12APcG_BgBKw&s", alt: "Open AI" },
    { link: "https://seeklogo.com/images/W/whisper-logo-AA78E4A800-seeklogo.com.png", alt: "Whisper" },
    { link: "https://miro.medium.com/v2/resize:fit:1044/1*d2XUNgrLw7687CDfXx9-Dw.png", alt: "Chroma DB" },
    { link: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/DeepSeek_logo.svg/1024px-DeepSeek_logo.svg.png", alt: "Deepseek" },
    { link: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kubernetes_logo.svg/1200px-Kubernetes_logo.svg.png", alt: "Kubernetes" },

    { link: "https://ollama.com/public/og.png", alt: "Ollama" },
    { link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sdA9_gDl2IPpUpEghok54n12APcG_BgBKw&s", alt: "Open AI" },
    { link: "https://seeklogo.com/images/W/whisper-logo-AA78E4A800-seeklogo.com.png", alt: "Whisper" },
    { link: "https://miro.medium.com/v2/resize:fit:1044/1*d2XUNgrLw7687CDfXx9-Dw.png", alt: "Chroma DB" },
    { link: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/DeepSeek_logo.svg/1024px-DeepSeek_logo.svg.png", alt: "Deepseek" },
    { link: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kubernetes_logo.svg/1200px-Kubernetes_logo.svg.png", alt: "Kubernetes" },

    { link: "https://ollama.com/public/og.png", alt: "Ollama" },
    { link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sdA9_gDl2IPpUpEghok54n12APcG_BgBKw&s", alt: "Open AI" },
    { link: "https://seeklogo.com/images/W/whisper-logo-AA78E4A800-seeklogo.com.png", alt: "Whisper" },
    { link: "https://miro.medium.com/v2/resize:fit:1044/1*d2XUNgrLw7687CDfXx9-Dw.png", alt: "Chroma DB" },
    { link: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/DeepSeek_logo.svg/1024px-DeepSeek_logo.svg.png", alt: "Deepseek" },
    { link: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kubernetes_logo.svg/1200px-Kubernetes_logo.svg.png", alt: "Kubernetes" },
]

</script>

<template>
    <div class="relative min-h-screen bg-white">
        <div class="absolute inset-0 bg-grid-white/[0.2] pointer-events-none"></div> <!-- Grid overlay -->

        <header class="flex items-center justify-between py-4 px-5">
            <Navbar />
        </header>

        <!-- Hero Section -->
        <section
            class="relative text-center w-full mx-auto bg-[url('/assets/banner.png')] bg-cover flex h-[800px] items-center">
            <div class="container mx-auto">
                <div class="w-1/3 text-left space-y-4">
                    <div class="text-6xl font-bold dark:text-gray-700">Best in class AI-powered Platform for App
                        Personalization</div>
                    <div class="text-lg text-gray-500">Deliver personalized offers to your users by leveraging our
                        AI-powered Platform as a Service for the most important monetization use cases.</div>
                    <button
                        class="bg-blue-600 text-white text-lg px-6 py-3 rounded-3xl flex items-center space-x-1 hover:bg-blue-500">
                        <div>Get a demo</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <LogoScroller :logos="logos" />


        <section class="relative text-center w-full mx-auto flex  items-center">
            <div
                class="container mx-auto bg-cover bg-[url(https://cdn.prod.website-files.com/628cd7cb65180392bc03aa04/62daa64963ff245accc13ac6_demo-bg.webp)] h-[500px] rounded-xl flex items-center px-10">
                <div class="w-1/2 text-left space-y-4">
                    <h1 class="text-5xl text-white">Schedule a demo</h1>
                    <div class="text-gray-400 text-xl">Nobody wants to be average! Our AI-powered solutions boost value
                        for you and your users.</div>
                    <button
                        class="bg-blue-600 text-white text-lg px-6 py-3 rounded-3xl flex items-center space-x-1 hover:bg-blue-500">
                        <div>Schedule a demo</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <section class="bg-gray-100 h-[400px] mt-20 dark:bg-transparent"></section>
    </div>
</template>
