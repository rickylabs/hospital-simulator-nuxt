<script setup>
const store = useScenarioStore()
await callOnce(store.fetchPatientsStatus)
</script>
<template>
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
        @click="store.shuffle('patients')"
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
  </UContainer>
</template>
