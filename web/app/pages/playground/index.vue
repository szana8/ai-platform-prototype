<script setup lang="ts">

const user = useSanctumUser()

</script>

<template>
    <div class="p-10">
        <h1 class="text-2xl font-bold text-gray-900">Hi {{ user?.name }}! Ready to get creative?</h1>
    </div>
    <div class="flex space-x-10 p-10">
        <div class="w-1/2 bg-cover bg-[url(/assets/imagination.webp)] h-[400px] rounded-xl grayscale hover:grayscale-0 hover:cursor-pointer flex items-center">
            <div class="text-3xl text-white font-extrabold p-8">Imagination</div>
        </div>
        <div class="w-1/2 bg-cover bg-[url(/assets/diarization.webp)] h-[400px] rounded-xl grayscale hover:grayscale-0 hover:cursor-pointer flex items-center">
            <div class="text-3xl text-white font-extrabold p-8">Diarization</div>
        </div>
    </div>
    <div class="p-10 space-y-3">
        <h1 class="text-2xl font-bold">Quick starts</h1>
        <div class="">
            <div class="grid grid-cols-3 space-x-3">
                <div class="bg-white flex items-center p-5 border border-gray-200 rounded-xl space-x-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <div>
                        <h4>Text to image</h4>
                        <small>Convert your ideas to beautifull images</small>
                    </div>
                </div>

                <div class="bg-white flex items-center p-5 border border-gray-200 rounded-xl space-x-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>

                    <div>
                        <h4>Generic Q&A chatbot</h4>
                        <small>Upload your dataset and ask question about it</small>
                    </div>
                </div>

                <div class="bg-white flex items-center p-5 border border-gray-200 rounded-xl space-x-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                    <div>
                        <h4>Summarization</h4>
                        <small>Summarize your document or text</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>