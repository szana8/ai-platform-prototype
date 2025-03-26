<script setup lang="ts">


</script>

<template>
    <div>
        <Banner />
        <div class="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
            <PrimaryNavigation class="fixed top-0 w-full" />

            <header v-if="$slots.header" class="bg-gray-100 dark:bg-gray-950 shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <main class="flex mt-14 overflow-hidden">
                <div class="w-1/12 px-4 py-4">
                    <Sidebar class="overflow-hidden" />
                </div>
                <div
                    class="w-11/12 overflow-hidden h-screen fixed right-0 bg-white dark:bg-gray-700 rounded-tl-2xl border border-gray-100 dark:border-gray-700">
                    <div class="p-4">
                        <slot class="overflow-auto" />
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>