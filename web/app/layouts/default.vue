<script setup lang="ts">
const teams = ref([
    { id: 1, name: 'Team A' },
    { id: 2, name: 'Team B' },
    { id: 3, name: 'Team C' },
])

const current_team_id = ref(1)
const hasTeamFeatures = ref(true)

const hasApiFeatures = ref(true)
const managesProfilePhotos = ref(true)
const profile_photo_url = ref('https://i.pravatar.cc/150?u=1')
const showingNavigationDropdown = ref(false)

import type { LaravelUser } from '~~/types/LaravelUser';

const { isAuthenticated, logout: logoutAction } = useSanctumAuth();
const user = useSanctumUser<LaravelUser>();



</script>

<template>
    <div>
        <Banner />
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <!-- 1 -->
                        <div class="flex justify-between">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <NuxtLink href="/dashboard">
                                    <ApplicationMark class="block h-9 w-auto" />
                                </NuxtLink>
                            </div>
                            <!-- End Logo -->
                             <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink :href="'/dashboard'"> Dashboard </NavLink>
                                <NavLink :href="'/playground'"> Playground </NavLink>
                                <NavLink :href="'/docs'"> Docs </NavLink>
                                <NavLink :href="'/api-reference'"> API Reference </NavLink>
                            </div>
                            <!-- End Navigation Links -->
                        </div>
                        <!-- End 1 -->

                         <!-- 2 -->
                         <div class="hidden sm:flex sm:items-center sm:ms-6">
                            <div class="ms-3 relative">
                                <!-- Teams Dropdown -->
                                <Dropdown v-if="hasTeamFeatures" align="right" width="60">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                                            >
                                                Team Name

                                                <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <div class="w-60">
                                            <!-- Team Management -->
                                            <div class="block px-4 py-2 text-xs text-gray-400">Manage Team</div>

                                            <!-- Team Settings -->
                                            <DropdownLink href="/"> Team Settings </DropdownLink>

                                            <DropdownLink href="/"> Create New Team </DropdownLink>

                                            <!-- Team Switcher -->
                                            <template>
                                                <div class="border-t border-gray-200 dark:border-gray-600" />

                                                <div class="block px-4 py-2 text-xs text-gray-400">Switch Teams</div>

                                                <template v-for="team in teams" :key="team.id">
                                                    <form @submit.prevent="">
                                                        <DropdownLink as="button">
                                                            <div class="flex items-center">
                                                                <svg
                                                                    v-if="team.id == current_team_id"
                                                                    class="me-2 h-5 w-5 text-green-400"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="1.5"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>

                                                                <div>{{ team.name }}</div>
                                                            </div>
                                                        </DropdownLink>
                                                    </form>
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>

                            <!-- Settings Dropdown -->
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
                         </div>
                         <!-- End 2 -->
                    </div>
                </div>
            </nav>

            <header v-if="$slots.header" class="bg-white dark:bg-gray-800 shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <main>
                <slot />
            </main>
        </div>
    </div>
</template>