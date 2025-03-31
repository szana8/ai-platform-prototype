<script setup lang="ts">
definePageMeta({
    middleware: ['sanctum:auth'],
    layout: "default",
    title: "Playground - Text to image"
})


const result = ref('');  // Store the result

const send = async () => {
    try {
        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input_value: "",
                output_type: "chat",
                input_type: "chat",
            })
        };

        // Fetch data using useSanctumFetch
        const response = await useSanctumFetch("http://localhost:8090/api/stream", fetchOptions);

        // Access the `data` field and get its `.value` property
        const streamContent = response.data.value;

        if (!streamContent) {
            console.error("No stream content found.");
            return;
        }

        // Append the content to the result variable
        result.value = streamContent;

        // Alternatively, you could do something more sophisticated here to manage content
        console.log('Stream content:', streamContent);

    } catch (fetchError) {
        console.error('Error:', fetchError);
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
