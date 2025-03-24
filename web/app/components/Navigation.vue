<script setup lang="ts">
import type { LaravelUser } from '~~/types/LaravelUser';

const { isAuthenticated, logout: logoutAction } = useSanctumAuth();
const user = useSanctumUser<LaravelUser>();

const logout = async () => {
    await logoutAction()
}

</script>
<template>
    <h1 class="text-xl font-bold flex items-center space-x-2">
        AI Platform
    </h1>

    <nav class="flex-1 text-center space-x-6">
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            About</NuxtLink>
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            Services</NuxtLink>
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            Blog</NuxtLink>
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            Resources</NuxtLink>
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            Contact Us</NuxtLink>
    </nav>

    <div v-if="isAuthenticated">
        <NuxtLink to="#" class="text-gray-900 font-semibold px-4 py-2">{{ user?.name }}</NuxtLink>
        <button v-on:click="logout">Logout</button>
    </div>

    <div v-else class="space-x-2">
        <NuxtLink to="auth/login"
            class="bg-blue-600 text-white font-semibold border border-blue-600 px-4 py-2 rounded-3xl hover:cursor-pointer hover:bg-blue-500">
            Login</NuxtLink>
        <NuxtLink to="auth/register"
            class="text-blue-600 hover:text-blue-500 font-semibold px-4 py-2 rounded-3xl hover:cursor-pointer">Sign
            Up</NuxtLink>
    </div>

</template>