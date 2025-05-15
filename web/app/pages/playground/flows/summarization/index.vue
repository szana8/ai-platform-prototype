<script setup lang="ts">
definePageMeta({
    middleware: ['sanctum:auth'],
    layout: "default",
    title: "Playground - Text to image"
})


const result = ref('');  // Store the result

const send = async () => {
    const sanctumFetch = useSanctumClient()
    const response = await sanctumFetch<ReadableStream, 'stream'>(
        'http://localhost:8090/api/test',
        {
            headers: {
                Accept: 'text/event-stream',
            },
            responseType: 'stream',
        },
    )

    const reader = response.pipeThrough(new TextDecoderStream()).getReader()

    while (true) {
        const { value, done } = await reader.read()

        if (done)
            break

        console.log('Received:', value)
    }
}

</script>

<template>
    <div class="relative h-screen">
        <h1>Summarization</h1>
        <button @click="send">Send</button>
        <div v-if="result">
            {{ result }}
        </div>
    </div>
</template>

<style scoped>
/* Add your styles here */
</style>
