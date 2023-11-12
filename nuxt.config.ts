// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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
  app: {
    head: {
      titleTemplate: '%s %separator Mr FAFO', // WA due to bug in SEO-KIT (to be removed once upgraded)
      templateParams: {
        separator: '•'
        // other common separators: '·', '—', '•'
      }
    }
  },
  gtag: {
    id: 'https://mrfafo.devozs.com/'
  },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-og-image',
    '@nuxtseo/module',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap'
  ],
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