import {defineStore} from 'pinia'
import {
  Quarantine,
  PatientState,
  PatientStateFullName,
  Drug,
  DrugFullName,
  DrugInteractions
} from "hospital-lib/dist/es/index";

const patientsAPI = process.env.LOCAL_API ? process.env.LOCAL_API + "/patients" :  '/api/hospital/patients';
const drugsAPI = process.env.LOCAL_API ? process.env.LOCAL_API + "/drugs" :  '/api/hospital/drugs';

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
      console.log(patientsAPI)
      try {
        const data = await $fetch(patientsAPI) // replace with your server's URL
        const patients = formatResponse(data, PatientStateFullName);
        this.patients = patientsDefault
        this.patients = {...this.patients, ...patients};
      } catch (error) {
        console.error('Failed to fetch and update status counts:', error)
      }
    },
    incrementPatientCount(patientType) {
      if (this.patients[patientType] && this.patients[patientType].value < 100) {
        this.patients[patientType].value++;
        this.results = patientsDefault
        this.completed = false
      }
    },

    decrementPatientCount(patientType) {
      if (this.patients[patientType] && this.patients[patientType].value > 0) {
        this.patients[patientType].value--;
        this.results = patientsDefault
        this.completed = false
      }
    },
    async fetchDrugs() {
      try {
        const data = await $fetch(drugsAPI) // replace with your server's URL
        const drugs = formatResponse(data, DrugFullName);
        this.drugs = drugsDefault
        this.drugs = {...this.drugs, ...drugs};
      } catch (error) {
        console.error('Failed to fetch and update status counts:', error)
      }
    },
    toggleDrug(drugType) {
      let selectedDrugs = Object.keys(this.drugs).filter(drug => this.drugs[drug].value > 0);
      if(selectedDrugs.length === 2 && this.drugs[drugType].value === 0) {
        console.warn("cannot select more than 2 drugs")
        return "max";
      }
      if(selectedDrugs.length === 1 && this.drugs[drugType].value === 1) {
        console.warn("you should select at least one drug")
        //return "min";
      }
      console.log(selectedDrugs)

      // Check if the drug is already selected
      if (selectedDrugs.includes(drugType)) {
        // If it is, remove it from the selectedDrugs array
        selectedDrugs = selectedDrugs.filter(drug => drug !== drugType);
      } else {
        // If it's not, add it to the selectedDrugs array
        selectedDrugs = [...selectedDrugs, drugType];
      }

      if(selectedDrugs.length){
        // Create an instance of the Quarantine class
        const quarantine = new Quarantine({});

        // Check if the new combination is safe
        const interaction = quarantine.determineInteraction(selectedDrugs);
        if (interaction === null) {
          console.warn("The new combination of drugs is not handled yet. Please try another combination.")
          return "unhandled";
        }
      }

      if (this.drugs[drugType]) {
        this.drugs[drugType].value = this.drugs[drugType].value === 0 ? 1 : 0;
        this.results = patientsDefault
        this.completed = false
        return true
      }
      return false
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
      console.log('administeredDrugs', administeredDrugs)

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
