<script setup lang="ts">
import type { LaravelUser } from '~~/types/LaravelUser';

const { isAuthenticated, logout: logoutAction } = useSanctumAuth();
const user = useSanctumUser<LaravelUser>();

const managesProfilePhotos = false

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
            Solutions</NuxtLink>
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            Pricing</NuxtLink>
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            Blog</NuxtLink>
        <NuxtLink to="#"
            class="text-gray-900 font-semibold hover:text-black hover:border-b-2 hover:border-gray-900 py-2">
            Contact Us</NuxtLink>
    </nav>

    <div v-if="isAuthenticated">
        <Dropdown align="right" width="48">
            <template #trigger>
                <button v-if="managesProfilePhotos"
                    class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                    <!-- <img class="h-8 w-8 rounded-full object-cover" :src="profile_photo_url"
                        :alt="user?.name || profile_photo_url" /> -->
                </button>

                <span v-else class="inline-flex rounded-md">
                    <button type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-900 bg-white  hover:text-gray-700  focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                        {{ user?.name }}

                        <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </span>
            </template>

            <template #content>
                <!-- Account Management -->
                <div class="block px-4 py-2 text-xs text-gray-900">Manage Account</div>
                <DropdownLink href="#"> Profile </DropdownLink>
                <div class="border-t border-gray-200 dark:border-gray-600" />

                <!-- Authentication -->
                <form @submit.prevent="logout">
                    <DropdownLink as="button" v-on:click="logout"> Log Out </DropdownLink>
                </form>
            </template>
        </Dropdown>
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