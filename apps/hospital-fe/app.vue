<script setup>
const links = [
  // Add your links here
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' }
]

useHead({
  title: 'Hospital Simulator',
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
  description: 'Powered by Nuxt'
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
