// https://nuxt.com/docs/api/configuration/nuxt-config7
import eslintConfig from './.eslintrc.cjs'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',//comment to disable lint in dev mode
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
  eslint: {
    overrideConfig: {
      rules: eslintConfig.rules
    }
  }
})
