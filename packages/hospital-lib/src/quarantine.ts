import {PatientsRegister} from './patientsRegister';

export enum PatientState {
    Fever = "F",
    Healthy = "H",
    Diabetes = "D",
    Tuberculosis = "T",
    Dead = "X"
}

export enum Drug {
    Aspirin = "As",
    Antibiotic = "An",
    Insulin = "I",
    Paracetamol = "P"
}

export enum DrugInteractions {
    ParacetamolAndAspirin = 'Death',
    AntibioticAndInsulin = 'FeverForHealthy',
    Aspirin = 'CuresFever',
    Antibiotic = 'CuresTuberculosis',
    Insulin = 'PreventsDiabeticDeath',
    Paracetamol = 'AlsoCuresFever',
}

export class Quarantine {
    private patientStates: PatientsRegister;
    private drugsAdministered: Drug[];
    private static readonly UNKNOWN_DRUG = 'Interaction for this drug/combination is not implemented';
    private hasStateChanged: Set<PatientState> = new Set();

    constructor(patients: PatientsRegister) {
        this.patientStates = patients;
        this.drugsAdministered = [];
    }

    public determineInteraction(drugs: Drug[]): DrugInteractions {
        const drugInteractionMap: { [key: string]: DrugInteractions } = {
            // Combinations of drugs should always respect alphabetical order
            [`${Drug.Aspirin}${Drug.Paracetamol}`]: DrugInteractions.ParacetamolAndAspirin,
            [`${Drug.Antibiotic}${Drug.Insulin}`]: DrugInteractions.AntibioticAndInsulin,
            [Drug.Aspirin]: DrugInteractions.Aspirin,
            [Drug.Antibiotic]: DrugInteractions.Antibiotic,
            [Drug.Insulin]: DrugInteractions.Insulin,
            [Drug.Paracetamol]: DrugInteractions.Paracetamol,
        };

        // Sort drugs to ensure the order doesn't affect the outcome
        const sortedDrugs = drugs.sort((a, b) => a.localeCompare(b));
        const drugKey = sortedDrugs.join('');
        return drugInteractionMap[drugKey] || null;
    }

    public setDrugs(drugs: Drug[]): void {
        this.drugsAdministered = drugs;
    }

    public wait40Days(): void {
        const interaction = this.determineInteraction(this.drugsAdministered);
        // Create a copy of the current patient states
        const newPatientStates: PatientsRegister = { ...this.patientStates };

        // If Paracetamol and Aspirin are administered together, all patients die
        if (interaction === DrugInteractions.ParacetamolAndAspirin) {
            const totalPatients = Object.values(newPatientStates).reduce((a, b) => a + b, 0);
            newPatientStates[PatientState.Dead] += totalPatients;
            Object.keys(newPatientStates).forEach(state => {
                if (state !== PatientState.Dead) {
                    newPatientStates[state as PatientState] = 0;
                }
            });
            this.patientStates = newPatientStates;
            return;
        }

        // Iterate over each patient state
        for (const state in this.patientStates) {
            // Get the number of patients in the current state
            const patientCount = this.patientStates[state as PatientState];

            // Apply the appropriate treatment based on the drugs administered
            switch (interaction) {
                case DrugInteractions.AntibioticAndInsulin:
                    // Healthy individuals develop fever
                    if (state === PatientState.Healthy) {
                        newPatientStates[PatientState.Fever] += patientCount;
                        newPatientStates[state as PatientState] = 0;
                    }
                    // Cures tuberculosis because of antibiotic
                    if (state === PatientState.Tuberculosis) {
                        newPatientStates[PatientState.Healthy] += patientCount;
                        newPatientStates[state as PatientState] = 0;
                    }
                    break;
                case DrugInteractions.Antibiotic:
                    // Cures tuberculosis
                    if (state === PatientState.Tuberculosis) {
                        newPatientStates[PatientState.Healthy] += patientCount;
                        newPatientStates[state as PatientState] = 0;
                    }
                    break;
                case DrugInteractions.Aspirin:
                case DrugInteractions.Paracetamol:
                    // Cures fever
                    if (state === PatientState.Fever) {
                        newPatientStates[PatientState.Healthy] += patientCount;
                        newPatientStates[state as PatientState] = 0;
                    }
                    break;
                case DrugInteractions.Insulin:
                    // Only prevent from dying for diabetic subject (does not cure diabetes)
                    break;
                default:
                    // No specific interaction
                    if(this.drugsAdministered.length) {
                        console.warn(`${Quarantine.UNKNOWN_DRUG}: ${this.drugsAdministered.join(', ')}`)
                    }
                    break;
            }

            // Diabetic patients die without insulin
            if (state === PatientState.Diabetes && !this.drugsAdministered.includes(Drug.Insulin)) {
                newPatientStates[PatientState.Dead] += patientCount;
                newPatientStates[state as PatientState] = 0;
            }
        }

        // Update the patient states
        this.patientStates = newPatientStates;
    }

    public report(): PatientsRegister {
        return this.patientStates;
    }
}
