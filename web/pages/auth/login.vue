<script setup lang="ts">
definePageMeta({
    middleware: ['sanctum:guest'],
    layout: 'empty',
});

const { login } = useSanctumAuth()

const credentials = {
    email: "test@example.com",
    password: "password",
    remember: false,
}

await login(credentials).then((response) => {
    console.log(response)
})

</script>

<template>
    <div>
        
    </div>
</template>