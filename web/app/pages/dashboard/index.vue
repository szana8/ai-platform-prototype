<script setup lang="ts">
definePageMeta({
    middleware: ['sanctum:auth'],
    layout: "default"
})
</script>

<template>
    <div>Dashboard</div>
</template>