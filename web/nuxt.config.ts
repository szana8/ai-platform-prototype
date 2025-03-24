// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-sanctum'],

  sanctum: {
      baseUrl: 'http://host.docker.internal:8090', // Laravel API
      mode: "token",
      endpoints: {
        login: '/api/login',
        logout: '/api/logout'
      }
  },
})