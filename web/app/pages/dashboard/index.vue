<script setup lang="ts">
definePageMeta({
    middleware: ['sanctum:auth'],
    layout: "default",
    title: "Dashboard"
})
const chartOptions = ref({
    title: {
        text: 'Daily usage'
    },
    series: [{
        data: [1, 2, 3, 4, 5, 6, 3, 2]
    }]
});

const chartOptions2 = ref({
    title: {
        text: 'Weekly usage'
    },
    series: [{
        data: [12, 4, 54, 23, 66, 23, 45, 76, 34, 54, 22]
    }]
});
</script>

<template>
    <div class="grid grid-cols-3 relative">
        <highchart :options="chartOptions"
            class="border border-gray-100 rounded-lg shadow-sm p-4 md:p-6 h-96 grayscale" />
        <highchart :options="chartOptions2"
            class="border border-gray-100 rounded-lg shadow-sm p-4 md:p-6 h-96 grayscale" />
        <highchart :options="chartOptions"
            class="border border-gray-100 rounded-lg shadow-sm p-4 md:p-6 h-96 grayscale" />
    </div>
    <div class="grid grid-cols-1 relative">
        <highchart :options="chartOptions"
            class="border border-gray-100 rounded-lg shadow-sm p-4 md:p-6 h-96 grayscale" />
    </div>
</template>