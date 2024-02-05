<template>
  <div>
    <UButton
      @click="simulate"
      icon="i-lucide-play"
      label="Start simulation"
      size="lg"
      color="primary"
      class="gap-1 px-4 py-2 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 text-primary-500 dark:text-primary-400 ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 dark:ring-opacity-25 hover:bg-lime-500 dark:hover:bg-lime-600 hover:text-white dark:hover:text-white"
    />

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header class="flex flex-row">
          <div class="h-8">
            <h2 class="text-2xl font-bold tracking-tighter lg:text-3xl mb-4">{{progress < maxProgress ? "Quarantine ongoing..." : "Quarantine completed"}}</h2>
          </div>
          <div class="absolute right-5 top-5 text-right min-w-24">
            <span class="text-lg text-primary-500 font-bold">Day {{ Math.round(progress) }}</span>
          </div>
        </template>

        <!-- Display progress bar with smooth animation -->
        <div v-if="progress < maxProgress" class="p-4">
          <UProgress :value="progress" :max="maxProgress" :color="color" indicator/>
        </div>


        <!-- Results are displayed after the progress completes -->
        <div v-if="progress >= maxProgress" class="min-h-96">
          <div v-if="store.results">
            <UTabs v-model="selected" :items="tabItems" @change="onChange" >
              <template #patients="{ item }">
                <UTable :rows="patientsData" :columns="columns" />
              </template>
              <template #results="{ item }">
                <UTable :rows="resultsData" :columns="columns" />
              </template>
            </UTabs>
          </div>
        </div>

        <template #footer>
          <div class="h-8">
            <UButton :label="progress < maxProgress ? 'Hide' : 'Close'" @click="closeModal" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const route = useRoute();
const router = useRouter();

const isOpen = ref(false);
const progress = ref(0);
const maxProgress = 40; // Representing 40 days

const store = useScenarioStore();

const color = computed(() => {
  switch (true) {
    case progress.value < 10: return 'red';
    case progress.value < 20: return 'orange';
    case progress.value < 30: return 'blue';
    default: return 'lime';
  }
});

const closeModal = () => {
  isOpen.value = false;
  progress.value = 0; // Reset progress when closing modal
  router.replace({}); // Clear the query parameters
};

const simulate = () => {
  isOpen.value = true;
  progress.value = 0;
  const totalDuration = 5000; // Total duration of 5 seconds
  const updatesPerSecond = 20; // More frequent updates for smoother transition
  const increment = maxProgress / (totalDuration / 1000 * updatesPerSecond);

  const interval = setInterval(() => {
    if (progress.value < maxProgress) {
      progress.value = Math.min(progress.value + increment, maxProgress);
    }
    if (progress.value >= maxProgress) {
      clearInterval(interval);
      // Forcefully complete the progress in case of any rounding errors
      progress.value = maxProgress;
      // Delay the simulation call to ensure UI updates
      setTimeout(() => {
        if(isOpen.value === false){
          isOpen.value = true
        }
        store.simulateTreatment()
        router.replace({ query: { tab: "Results" } })
      }, 100);
    }
  }, 1000 / updatesPerSecond);
};

// Define the columns for the tables
const columns = [
  { key: 'type', label: 'Type' },
  { key: 'label', label: 'Label' },
  { key: 'value', label: 'Value' },
];

// Prepare data for the patients table
const patientsData = computed(() => {
  return Object.entries(store.patients).map(([type, { label, value }]) => ({
    type, label, value: `${value} patient(s)`
  }));
});

// Prepare data for the results table
const resultsData = computed(() => {
  return Object.entries(store.results).map(([type, { label, value }]) => ({
    type, label, value: `${value} patient(s)`
  }));
});

// Define items for UTabs
const tabItems = ref([
  { label: 'Patients', slot: 'patients' },
  { label: 'Results', slot: 'results' }
]);

const selected = computed({
  get () {
    const index = tabItems.value.findIndex((item) => item.label === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    router.replace({ query: { tab: tabItems.value[value].label } })
  }
});

function onChange (index) {
  /* for debugging purposes */
}
</script>
