<script setup>
const store = useScenarioStore()
// Use useAsyncData to fetch data asynchronously
await callOnce(store.fetchPatientsStatus)
await callOnce(store.fetchDrugs)
</script>
<template>
  <header class="flex flex-row gap-4 p-4 w-full align-center h-full">
    <div class="w-96">
      Hospital Simulator <UBadge label="0.0.1" variant="subtle" class="mb-0.5" />
    </div>
  </header>

  <UContainer id="hero" as="section" class="py-8">
    <div class="">
      <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <img
          src="/hero.svg"
          width="550"
          height="550"
          alt="Hero"
          class="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
        >
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
            <Simulate />
            <History />
          </div>
        </div>
      </div>
    </div>
  </UContainer>

  <Patients />
  <Drugs />
</template>
