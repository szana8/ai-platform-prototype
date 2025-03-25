<script setup lang="ts">
const hasApiFeatures = ref(true)
const managesProfilePhotos = ref(true)
const profile_photo_url = ref('https://i.pravatar.cc/150?u=1')


import type { LaravelUser } from '~~/types/LaravelUser';

const { isAuthenticated, logout: logoutAction } = useSanctumAuth();
const user = useSanctumUser<LaravelUser>();

const logout = async () => {
    await logoutAction()
}
</script>

<template>
    <div class="ms-3 relative" v-if="isAuthenticated">
        <Dropdown align="right" width="48">
            <template #trigger>
                <button v-if="managesProfilePhotos" class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                    <img class="h-8 w-8 rounded-full object-cover" :src="profile_photo_url" :alt="user?.name || profile_photo_url" />
                </button>

                <span v-else class="inline-flex rounded-md">
                    <button
                        type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                    >
                        {{ user?.name }}

                        <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </span>
            </template>

            <template #content>
                <!-- Account Management -->
                <div class="block px-4 py-2 text-xs text-gray-400">Manage Account</div>

                <DropdownLink href="/profile"> Profile </DropdownLink>

                <DropdownLink v-if="hasApiFeatures" href="/"> API Tokens </DropdownLink>

                <div class="border-t border-gray-200 dark:border-gray-600" />

                <!-- Authentication -->
                <form @submit.prevent="logout">
                    <DropdownLink as="button"> Log Out </DropdownLink>
                </form>
            </template>
        </Dropdown>
    </div>
</template>