<script setup>
const links = [{
  label: 'Features',
  to: '#features',
  exactHash: true
}, {
  label: 'Documentation',
  to: 'https://ui.nuxt.com/pro',
  target: '_blank'
}]

useHead({
  title: 'Nuxt UI Pro - Starter',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  description: 'Nuxt UI Pro is a collection of premium components built on top of Nuxt UI to create beautiful & responsive Nuxt applications in minutes.'
})
</script>

<style>
html {
  overflow-x: hidden;
}
</style>

<template>
  <Body class="flex flex-col min-h-screen max-w-full overflow-hidden">
    <NuxtPage/>

    <div class="h-12 w-full"/>

    <footer class="fixed bottom-0 flex flex-row gap-4 p-4 w-screen justify-center">
      Copyright Rickylabs © {{ new Date().getFullYear() }}
    </footer>
    <UNotifications />
  </Body>

</template>
