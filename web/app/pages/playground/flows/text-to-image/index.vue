<script setup lang="ts">
const prompt = reactive({
    message: "",
})

let result: any;

const submit = () => {
    //
}
</script>

<template>
    <TextInput type="text" v-model="prompt.message" />
    <button v-on:click="submit">Send</button>
    <div>Result: {{ result }}</div>
</template>