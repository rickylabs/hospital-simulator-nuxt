import {Drug, PatientState} from "./quarantine.ts";

export const PatientStateFullName = {
    [PatientState.Fever]: 'Fever',
    [PatientState.Healthy]: 'Healthy',
    [PatientState.Diabetes]: 'Diabetes',
    [PatientState.Tuberculosis]: 'Tuberculosis',
    [PatientState.Dead]: 'Dead',
}

export const DrugFullName = {
    [Drug.Aspirin]: 'Aspirin',
    [Drug.Antibiotic]: 'Antibiotic',
    [Drug.Insulin]: 'Insulin',
    [Drug.Paracetamol]: 'Paracetamol',
}