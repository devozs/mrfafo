<script setup lang="ts">

useHead({
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Mr FAFO Mole' },
    { name: 'twitter:description', content: 'Fuck Around and Find Out' },
    { name: 'twitter:image', content: 'https://www.mrfafo.com/images/cover.png' },
    { name: 'twitter:site', content: '@devozs' },
    { name: 'twitter:creator', content: '@devozs' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: 'Mr FAFO Mole' },
    { name: 'og:description', content: 'Fuck Around and Find Out' },
    { name: 'og:url', content: 'https://www.mrfafo.com' },
    { name: 'og:image', content: 'https://www.mrfafo.com/images/cover.png' },
    { name: 'og:image:secure_url', content: 'https://www.mrfafo.com/images/cover.png' },
  ],
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
});
</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>
