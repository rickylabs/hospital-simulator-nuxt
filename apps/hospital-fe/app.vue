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

const store = useScenarioStore()
// Use useAsyncData to fetch data asynchronously
await callOnce(store.fetchPatientsStatus)
await callOnce(store.fetchDrugs)
console.log(store.patients)

</script>

<template>
  <Body class="flex flex-col min-h-screen">
    <header class="flex flex-row gap-4 p-4 w-full align-center h-full">
      <div class="w-96">Hospital Simulator <UBadge label="0.0.1" variant="subtle" class="mb-0.5" /></div>
    </header>

    <UContainer as="section" id="hero" class="py-8">
      <div class="">
        <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            src="/hero.svg"
            width="550"
            height="550"
            alt="Hero"
            class="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
          />
          <div class="flex flex-col justify-center space-y-8">
            <div class="space-y-2">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to Hospital Simulator
              </h1>
              <p class="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Experience the power of state prediction. Simulate patient care and drug administration scenarios.
              </p>
            </div>
            <div class="flex flex-col gap-4 min-[400px]:flex-row">
              <Simulate/>
              <History/>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <UContainer as="section" id="patients" class="mb-8">
        <h2 class="text-2xl font-bold tracking-tighter lg:text-3xl mb-4">Patients States</h2>
        <div v-if="Object.keys(store.patients).length" class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(patient) in store.patients" :key="patient" class="">
            <UCard>
              <div class="flex items-center space-x-4">
                <UAvatar :alt="patient.type" size="sm" />
                <div class="space-y-2">
                  <div class="h-4 w-[250px]">{{ patient.label }}</div>
                  <div class="h-4 w-[270px]">
                    {{patient.type === "X" ? "We won't even try :)" : patient.value + "  patient(s)"}}
                  </div>
                </div>
              </div>
            </UCard>
          </div>
          <UCard
            class="h-full flex justify-center items-center min-h-20 p-2"
            :ui="{background: 'bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 hover:bg-lime-500 dark:hover:bg-lime-600 hover:text-white dark:hover:text-white cursor-pointer'}"
            @click="store.fetchPatientsStatus"
          >
            <div class="flex flex-row gap-2 justify-center items-center">
              <div class="flex justify-center items-center">
                <UIcon name="i-lucide-shuffle" />
              </div>
              <div>
                Shuffle
              </div>
            </div>
          </UCard>
        </div>
        <div v-else>
          <UCard>
            <div class="flex items-center space-x-4">
              <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
              <div class="space-y-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
              </div>
            </div>
          </UCard>
        </div>
        <NuxtPage />
    </UContainer>

    <UContainer as="section" id="drugs" class="mb-8">
        <h2 class="text-2xl font-bold tracking-tighter lg:text-3xl mb-4">Drugs</h2>
        <div v-if="Object.keys(store.drugs).length" class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(drug) in store.drugs" :key="drug" class="">
            <UCard>
              <div class="flex items-center space-x-4">
                <UAvatar :alt="drug.type" size="sm" />
                <div class="space-y-2">
                  <div class="h-4 w-[250px]">{{ drug.label }}</div>
                  <div class="h-4 w-[200px]">{{ drug.value }}</div>
                </div>
              </div>
            </UCard>
          </div>
          <UCard
            class="h-full flex justify-center items-center min-h-20 p-2"
            :ui="{background: 'bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 hover:bg-lime-500 dark:hover:bg-lime-600 hover:text-white dark:hover:text-white cursor-pointer'}"
            @click="store.fetchDrugs"
          >
            <div class="flex flex-row gap-2 justify-center items-center">
              <div class="flex justify-center items-center">
                <UIcon name="i-lucide-shuffle" />
              </div>
              <div>
                Shuffle
              </div>
            </div>
          </UCard>
        </div>
        <div v-else>
          <UCard>
            <div class="flex items-center space-x-4">
              <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
              <div class="space-y-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
              </div>
            </div>
          </UCard>
        </div>
        <NuxtPage />
    </UContainer>

    <div class="h-12 w-full"/>

    <footer class="fixed bottom-0 flex flex-row gap-4 p-4 w-full justify-center">
      Copyright Rickylabs © {{ new Date().getFullYear() }}
    </footer>
  </Body>

</template>
