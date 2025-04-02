<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    active: Boolean,
    href: String,
    name: String,
})

const route = useRoute()

const isActive = computed(() => {
    return route.path.startsWith(props.href || '') // Ensures it remains active on child pages
})

const activeLink = 'text-gray-700 font-light bg-gray-100 p-2 rounded-lg'
const inActiveLink = 'text-gray-500 font-light hover:bg-gray-100 hover:text-gray-600 p-2 rounded-lg'

</script>

<template>
    <dd :class="isActive ? activeLink : inActiveLink">
        <NuxtLink :href="href" class="flex space-x-2">
            <slot />
            <div>{{ name }}</div>
        </NuxtLink>
    </dd>
</template>