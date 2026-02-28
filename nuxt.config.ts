// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      gtagId: 'G-HQQ2EG0LK7',
    },
  },
  site: {
    url: 'https://mrfafo.devozs.com',
    name: 'Mr FAFO',
    description: 'Mr FAFO',
    defaultLocale: 'he-IL',
    trailingSlash: true,
    identity: {
      type: 'Person'
    },
    twitter: '@DevOzs',

  },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@pinia/nuxt', '@nuxtjs/seo'],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs']
  },
  imports: {
    dirs: ['./stores/**', './models'],
    // imports: [
    //   {from: 'pinia', name: 'defineStore'}
    // ]
  }
})