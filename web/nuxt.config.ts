// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-sanctum', 'nuxt-highcharts'],

  sanctum: {
      baseUrl: 'http://localhost:8090',
      redirect: {
        onLogin: '/dashboard',
        onAuthOnly: '/auth/login'
      },
      logLevel: 5,
  },
})