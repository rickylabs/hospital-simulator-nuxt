var PatientState = /* @__PURE__ */ ((PatientState2) => {
  PatientState2["Fever"] = "F";
  PatientState2["Healthy"] = "H";
  PatientState2["Diabetes"] = "D";
  PatientState2["Tuberculosis"] = "T";
  PatientState2["Dead"] = "X";
  return PatientState2;
})(PatientState || {});
var Drug = /* @__PURE__ */ ((Drug2) => {
  Drug2["Aspirin"] = "As";
  Drug2["Antibiotic"] = "An";
  Drug2["Insulin"] = "I";
  Drug2["Paracetamol"] = "P";
  return Drug2;
})(Drug || {});
const _Quarantine = class {
  constructor(patients) {
    this.hasStateChanged = /* @__PURE__ */ new Set();
    this.patientStates = patients;
    this.drugsAdministered = [];
  }
  determineInteraction(drugs) {
    const drugInteractionMap = {
      [`${"As"}${"P"}`]: "Death",
      [`${"An"}${"I"}`]: "FeverForHealthy",
      ["As"]: "CuresFever",
      ["An"]: "CuresTuberculosis",
      ["I"]: "PreventsDiabeticDeath",
      ["P"]: "AlsoCuresFever"
    };
    const sortedDrugs = drugs.sort((a, b) => a.localeCompare(b));
    const drugKey = sortedDrugs.join("");
    return drugInteractionMap[drugKey] || null;
  }
  updateState(fromState, toState) {
    if (this.hasStateChanged.size > 0) {
      return;
    }
    this.patientStates[toState] += this.patientStates[fromState];
    this.patientStates[fromState] = 0;
    this.hasStateChanged.add(fromState);
  }
  setDrugs(drugs) {
    this.drugsAdministered = drugs;
  }
  wait40Days() {
    const interaction = this.determineInteraction(this.drugsAdministered);
    const newPatientStates = { ...this.patientStates };
    if (interaction === "Death") {
      const totalPatients = Object.values(newPatientStates).reduce((a, b) => a + b, 0);
      newPatientStates["X"] += totalPatients;
      Object.keys(newPatientStates).forEach((state) => {
        if (state !== "X") {
          newPatientStates[state] = 0;
        }
      });
      this.patientStates = newPatientStates;
      return;
    }
    for (const state in this.patientStates) {
      const patientCount = this.patientStates[state];
      switch (interaction) {
        case "FeverForHealthy":
          if (state === "H") {
            newPatientStates["F"] += patientCount;
            newPatientStates[state] = 0;
          }
          if (state === "T") {
            newPatientStates["H"] += patientCount;
            newPatientStates[state] = 0;
          }
          break;
        case "CuresTuberculosis":
          if (state === "T") {
            newPatientStates["H"] += patientCount;
            newPatientStates[state] = 0;
          }
          break;
        case "CuresFever":
        case "AlsoCuresFever":
          if (state === "F") {
            newPatientStates["H"] += patientCount;
            newPatientStates[state] = 0;
          }
          break;
        case "PreventsDiabeticDeath":
          break;
        default:
          if (this.drugsAdministered.length) {
            console.warn(`${_Quarantine.UNKNOWN_DRUG}: ${this.drugsAdministered.join(", ")}`);
          }
          break;
      }
      if (state === "D" && !this.drugsAdministered.includes("I")) {
        newPatientStates["X"] += patientCount;
        newPatientStates[state] = 0;
      }
    }
    this.patientStates = newPatientStates;
  }
  report() {
    return this.patientStates;
  }
};
let Quarantine = _Quarantine;
Quarantine.UNKNOWN_DRUG = "Interaction for this drug/combination is not implemented";
const PatientStateFullName = {
  [PatientState.Fever]: "Fever",
  [PatientState.Healthy]: "Healthy",
  [PatientState.Diabetes]: "Diabetes",
  [PatientState.Tuberculosis]: "Tuberculosis",
  [PatientState.Dead]: "Dead"
};
const DrugFullName = {
  [Drug.Aspirin]: "Aspirin",
  [Drug.Antibiotic]: "Antibiotic",
  [Drug.Insulin]: "Insulin",
  [Drug.Paracetamol]: "Paracetamol"
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export { Drug, DrugFullName, PatientState, PatientStateFullName, Quarantine, getRandomInt };
