import {defineStore} from 'pinia'
import {
  Quarantine,
  PatientState,
  PatientStateFullName,
  Drug,
  DrugFullName,
} from "hospital-lib/dist/es/index";

function formatResponse(statuses, labels) {
  return statuses.split(',').reduce((acc, key) => {
    const count = (acc[key]?.value || 0) + 1;
    acc[key] = {
      type: key,
      value: count,
      label: labels[key]
    };
    return acc;
  }, {})
}

const patientsDefault = Object.fromEntries(Object.values(PatientState).map(state => [state, {
  type: state,
  value: 0,
  label: PatientStateFullName[state]
}]))
const drugsDefault = Object.fromEntries(Object.values(Drug).map(drug => [drug, {
  type: drug,
  value: 0,
  label: DrugFullName[drug]
}]))


export const useScenarioStore = defineStore('scenarioStore', {
  state: () => ({
    completed: false,
    patients: patientsDefault,
    drugs: drugsDefault,
    results: patientsDefault,
    history: []
  }),
  actions: {
    async fetchPatientsStatus() {
      try {
        const data = await $fetch('/api/hospital/patients') // replace with your server's URL
        const patients = formatResponse(data, PatientStateFullName);
        this.patients = patientsDefault
        this.patients = {...this.patients, ...patients};
      } catch (error) {
        console.error('Failed to fetch and update status counts:', error)
      }
    },
    async fetchDrugs() {
      try {
        const data = await $fetch('/api/hospital/drugs') // replace with your server's URL
        const drugs = formatResponse(data, DrugFullName);
        this.drugs = drugsDefault
        this.drugs = {...this.drugs, ...drugs};
      } catch (error) {
        console.error('Failed to fetch and update status counts:', error)
      }
    },
    async shuffle(type) {
      switch (type) {
        case "patients":
          await this.fetchPatientsStatus()
          break;
        case "drugs":
          await this.fetchDrugs()
          break;
        default:
          await this.fetchPatientsStatus()
          await this.fetchDrugs()
      }
      this.results = patientsDefault
      this.completed = false
    },
    retrieveHistory() {
      try {
        const history = JSON.parse(localStorage.getItem('history'));
        if(!history){
          return []
        }
        if(!Array.isArray(history)){
          localStorage.removeItem('history')
          return []
        }
        if (this.history.length === 0) {
          return history;
        }
      } catch (error) {
        console.error('Failed to parse history from cookies:', error);
      }
      return [];
    },
    saveToHistory() {
      const timestamp = Date.now();
      this.history.push({
        patients: { ...this.patients },
        drugs: { ...this.drugs },
        results: { ...this.results },
        timestamp
      });

      // Limit history to the last 10 simulations
      if (this.history.length > 10) {
        this.history = this.history.slice(-10);
      }

      // Persist history to cookies
      localStorage.setItem('history', JSON.stringify(this.history));
    },
    clearHistory() {
      const historyCookie = useCookie('history');
      this.history = [];

      // Clear history from cookies
      historyCookie.value = null;
    },
    simulateTreatment() {
      // Transform the patients object to match the expected input format for Quarantine
      const patientCounts = Object.values(this.patients).reduce((acc, {type, value}) => {
        acc[type] = value;
        return acc;
      }, {});

      const quarantine = new Quarantine(patientCounts);
      const administeredDrugs = Object.keys(this.drugs).filter(drug => this.drugs[drug].value > 0);

      quarantine.setDrugs(administeredDrugs);
      quarantine.wait40Days();

      const results = quarantine.report();
      this.results = patientsDefault

      // Transform back the results in the store
      this.results = Object.keys(results).reduce((acc, key) => {
        acc[key] = {
          type: key,
          value: results[key],
          label: PatientStateFullName[key]
        };
        return acc;
      }, {});

      // Save to history after each simulation
      this.saveToHistory();
      this.completed = true
    },
    initializeStore() {
      this.history = this.retrieveHistory();
    },
  }
})
