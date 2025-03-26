<script setup lang="ts">

defineProps<{
  logos: { link: string; alt: string }[];
}>();

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