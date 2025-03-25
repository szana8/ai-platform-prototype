<script setup lang="ts"></script>
<template>
    <div class="flex">
        <!-- Logo -->
        <!-- <div class="shrink-0 flex items-center">
            <NuxtLink href="/dashboard">
                <ApplicationMark class="block h-9 w-auto" />
            </NuxtLink>
        </div> -->
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
</template>