<script setup lang="ts">
const prompt = reactive({
    message: "",
})

const messages = <any>[]

const submit = () => {
    messages.push({ type: "User", text: prompt.message })

    // Fake ai response
    messages.push({ type: "AI", text: "Thanks for your response" })

    prompt.message = ""
}
</script>

<template>
    <div class="py-10 px-32 space-y-10 relative">
        <div class="relative left-1/2 transform -translate-x-1/2 w-full max-w-2xl p-4 space-y-4">
            <div class="space-y-2 overflow-y-auto ">
                <div v-for="message in messages"
                    :class="message.type === 'User' ? 'justify-end flex' : 'justify-start flex'">
                    <div
                        :class="message.type === 'User' ? 'bg-gray-400 text-gray-800 dark:text-gray-900 p-3 rounded-lg max-w-xs' : 'text-gray-800 dark:text-white p-3 rounded-lg max-w-xs'">
                        <p>{{ message.text }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 py-8">
            <!-- Textarea Container -->
            <div class="relative w-full">
                <!-- The textarea itself -->
                <textarea rows="4" v-model="prompt.message"
                    class="w-full p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none resize-none placeholder-gray-400 text-gray-800 dark:bg-gray-700 dark:text-white"
                    placeholder="Type your message here..."></textarea>

                <!-- Optional: You can add a submit button or other features here -->
                <button v-on:click="submit"
                    class="absolute right-4 bottom-4 bg-blue-500 text-white p-2 rounded-full focus:outline-none hover:bg-blue-600 dark:hover:bg-gray-400 dark:bg-white dark:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M17.707 10.707a1 1 0 0 0 0-1.414l-5-5a1 1 0 0 0-1.414 1.414L15.586 9H3a1 1 0 0 0 0 2h12.586l-4.293 4.293a1 1 0 1 0 1.414 1.414l5-5z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

</template>