<script setup lang="ts">
const isOpen = ref(false)
const store = useScenarioStore()

onMounted(() => {
  store.initializeStore()
})
/* use it for debugging purpose
watch(store.history, (newHistory, oldHistory) => {
  //use it for debugging purpose
})
 */

const historyTableData = computed(() => store.history.map((entry) => ({
  date: new Date(entry.timestamp).toLocaleString('fr-CH', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
  input: Object.entries(entry.patients).map(([key, value]) => `${key}:${value.value}`).join(', '),
  treatment: Object.entries(entry.drugs).map(([key, value]) => `${key}:${value.value}`).join(', '),
  output: Object.entries(entry.results).map(([key, value]) => `${key}:${value.value}`).join(', ')
})))
</script>

<template>
  <div>
    <UButton
      icon="i-lucide-history"
      label="View history"
      size="lg"
      class="gap-1 px-4 py-2 bg-grey-50 dark:bg-grey-400 dark:bg-opacity-100 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 hover:bg-lime-500 dark:hover:bg-lime-600 hover:text-white dark:hover:text-white"
      @click="isOpen = true"
    />

    <USlideover v-model="isOpen" :ui="{width: 'w-screen max-w-2xl'}">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="h-8 flex flex-row justify-between">
            <h2 class="text-2xl font-bold tracking-tighter lg:text-3xl mb-4">
              History
            </h2>
            <div>
              <UButton
                icon="i-lucide-x"
                variant="link"
                color="primary"
                size="sm"
                @click="isOpen = false"
              />
            </div>
          </div>
        </template>

        <div class="h-full">
          <div class="flex flex-col gap-4">
            <div class="flex items center justify-between">
              <UTable :rows="historyTableData" class="w-full" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="h-8 flex flex-row gap-4 justify-between w-full">
            <div>
              <UButton
                label="Close"
                color="grey"
                size="large"
                class="gap-1 px-4 py-2 bg-grey-50 dark:bg-grey-400 dark:bg-opacity-100 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 hover:bg-lime-500 dark:hover:bg-lime-600 hover:text-white dark:hover:text-white"
                @click="isOpen = false"
              />
            </div>
            <div>
              <UButton
                label="Clear history"
                size="large"
                class="gap-1 px-4 py-2 bg-red-50 dark:bg-red-400 dark:bg-opacity-10 text-red-500 dark:text-red-400 ring-1 ring-inset ring-red-500 dark:ring-red-400 ring-opacity-25 dark:ring-opacity-25 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white dark:hover:text-white"
                @click="store.clearHistory"
              />
            </div>
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
