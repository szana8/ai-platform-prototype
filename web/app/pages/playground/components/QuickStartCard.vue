<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: ""
    },
    route: {
        type: String,
        default: "#"
    }
})
</script>
<template>
    <NuxtLink :to="route"
        class="bg-white dark:bg-gray-700 hover:dark:text-gray-700 flex items-center p-5 border border-gray-200 rounded-xl space-x-5 shadow hover:cursor-pointer hover:bg-gray-200 hover:border-gray-300">
        <div>
            <slot name="icon" />
        </div>

        <div>
            <h4>{{ title }}</h4>
            <small>{{ description }}</small>
        </div>
    </NuxtLink>
</template>