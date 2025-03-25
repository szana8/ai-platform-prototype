<script setup lang="ts">
import type { LaravelUser } from '~~/types/LaravelUser';
import Recommendation from './partial/Recommendation.vue';
import QuickStarts from './partial/QuickStarts.vue';


definePageMeta({
    middleware: ['sanctum:auth'],
    layout: "default",
    title: "Playground",
})

const user = useSanctumUser<LaravelUser>()

</script>

<template>
    <div class="py-10 px-32 space-y-10 relative">
        <div>
            <h1 class="text-2xl font-bold">Hi {{ user?.name }}! Ready to get creative?</h1>
        </div>

        <Recommendation />

        <QuickStarts />
    </div>
</template>