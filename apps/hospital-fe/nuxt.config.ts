// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  ui: {
    icons: ['lucide', 'simple-icons']
  },
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      LOCAL_API: process.env.LOCAL_API,

    },
  },
})
