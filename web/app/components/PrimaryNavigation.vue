<script setup lang="ts">

</script>

<template>
    <nav class="bg-gray-50 dark:bg-gray-800">
                <!-- Primary Navigation Menu -->
                <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between py-3">
                        <!-- 1 -->
                        <TeamDropdown />

                        <!-- End 1 -->

                        <!-- 2 -->
                        <div class="hidden sm:flex sm:items-center sm:ms-6">
                            <NavigationLinks />

                            <!-- Settings Dropdown -->
                            <SettingsDropdown />
                         </div>
                        <!-- End 2 -->
                    </div>
                </div>
            </nav>
</template>