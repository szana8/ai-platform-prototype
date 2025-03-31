<script setup lang="ts">
import type { LoginForm } from '~~/types/LoginForm';

definePageMeta({
    middleware: ['sanctum:guest'],
    layout: 'empty',
    title: 'Login'
});

const { login } = useSanctumAuth()

const form = reactive<LoginForm>({
    email: "test@example.com",
    password: "password"
})

const submit = async () => {
    await login(form)
}

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 class="text-2xl font-bold mb-6">Welcome back!</h2>

            <form v-on:submit.prevent="submit" method="POST">
                <div class="mb-4 text-left">
                    <label class="block text-gray-700 text-sm font-bold mb-1">Email</label>
                    <div class="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16 12H8m8 0h-8m8 0H8m8 0H8m8 0H8m8 0H8"></path>
                        </svg>
                        <input type="email" placeholder="Enter your email"
                            class="w-full bg-transparent outline-none ml-2" />
                    </div>
                </div>

                <div class="mb-4 text-left">
                    <label class="block text-gray-700 text-sm font-bold mb-1">Password</label>
                    <div class="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 15v2m0-2a2 2 0 012-2 2 2 0 00-2-2 2 2 0 00-2 2 2 2 0 012 2zm0 0v2m6 0V9a6 6 0 10-12 0v6m12 0H6">
                            </path>
                        </svg>
                        <input type="password" placeholder="Enter password"
                            class="w-full bg-transparent outline-none ml-2" />
                    </div>
                    <a href="#" class="text-blue-500 text-sm float-right mt-1">Forgot Password?</a>
                </div>

                <button type="submit"
                    class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">Log
                    In</button>
            </form>

            <div class="mt-4">
                <button
                    class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="google" class="w-5 h-5">
                        <path fill="#fbbb00"
                            d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z">
                        </path>
                        <path fill="#518ef8"
                            d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z">
                        </path>
                        <path fill="#28b446"
                            d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z">
                        </path>
                        <path fill="#f14336"
                            d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z">
                        </path>
                    </svg>
                    <div>Sign in with Google</div>
                </button>
                <button
                    class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition mt-2 space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="github" class="w-5 h-5">
                        <path
                            d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z">
                        </path>
                    </svg>
                    <div>Sign in with GitHub</div>
                </button>
            </div>
        </div>

        <div class="absolute top-5 right-5 text-white">
            <span>Don't have an account?</span>
            <a href="#" class="ml-2 text-white bg-purple-500 px-3 py-1 rounded-full text-sm hover:bg-purple-600">Sign
                up</a>
        </div>

        <div class="absolute bottom-5 text-white text-xs">LET'S MAKE THE WORLD MORE PRODUCTIVE, TOGETHER.</div>
    </div>
</template>