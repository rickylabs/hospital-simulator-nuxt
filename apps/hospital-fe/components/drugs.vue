<script setup>
const store = useScenarioStore()
const toast = useToast()
await callOnce(store.fetchDrugs)

function toggleDrug(drug) {
  const updated = store.toggleDrug(drug.type)
  if(!updated) {
    toast.add({
      id: drug.value === 1 ? 'drug-min-reached' : 'drug-max-reached',
      title: 'Update failed',
      description: drug.value === 1 ? 'You need at least one drug' : 'You can\'t remove the last drug',
      icon: 'i-lucide-alert-triangle',
      timeout: 5000,
      color:"amber"
    })
  }
}
</script>
<template>
  <UContainer as="section" id="drugs" class="mb-8">
    <h2 class="text-2xl font-bold tracking-tighter lg:text-3xl mb-4">Drugs</h2>
    <div v-if="Object.keys(store.drugs).length" class="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(drug) in store.drugs" :key="drug" class="">
        <UCard>
          <div class="flex items-center space-x-0 md:space-x-4 w-full">
            <UAvatar :alt="drug.type" size="sm" class="hidden md:flex"/>
            <div class="flex items-center space-y-2 w-full">
              <div class="h-6">{{ drug.label }}</div>
            </div>
            <div class="position-absolute right-0">
              <UToggle
                @click="toggleDrug(drug)"
                on-icon="i-heroicons-check-20-solid"
                off-icon="i-heroicons-x-mark-20-solid"
                :model-value="!!drug.value"
              />
            </div>
          </div>
        </UCard>
      </div>
      <UCard
        class="h-full flex justify-center items-center min-h-20 p-2"
        :ui="{background: 'bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 hover:bg-lime-500 dark:hover:bg-lime-600 hover:text-white dark:hover:text-white cursor-pointer'}"
        @click="store.shuffle('drugs')"
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
