<script setup lang="ts">

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
    <section class="relative text-center w-full mx-auto flex items-center overflow-hidden py-5">
        <div class="animate-scroll flex space-x-20 grayscale">
            <img v-for="logo in logos" :key="logo.alt" :src="logo.link" class="h-12" :alt="logo.alt" />
        </div>
    </section>
</template>

<style scoped>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

.animate-scroll {
    animation: scroll 30s linear infinite;
}
</style>