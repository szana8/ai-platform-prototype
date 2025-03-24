<script setup lang="ts">
const route = useRoute()

useHead({
  title: <string>route.meta.title
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage class="bg-white h-screen" />
  </NuxtLayout>
</template>
