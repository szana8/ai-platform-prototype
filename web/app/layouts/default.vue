<script setup lang="ts">


</script>

<template>
    <div>
        <Banner />
        <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
            <PrimaryNavigation />

            <header v-if="$slots.header" class="bg-gray-100 dark:bg-gray-800 shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <main class="flex">
                <div class="w-60 px-4 py-4">
                    <Sidebar />
                </div>
                <div class="w-full bg-white relative rounded-t-2xl border border-gray-100">
                    <div class="p-4">
                        <slot />
                    </div>
                </div>
                
            </main>
        </div>
    </div>
</template>