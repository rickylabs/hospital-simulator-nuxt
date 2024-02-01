import { PatientsRegister } from './patientsRegister';
export declare enum PatientState {
    Fever = "F",
    Healthy = "H",
    Diabetes = "D",
    Tuberculosis = "T",
    Dead = "X"
}
export declare enum Drug {
    Aspirin = "As",
    Antibiotic = "An",
    Insulin = "I",
    Paracetamol = "P"
}
export declare class Quarantine {
    private patientStates;
    private drugsAdministered;
    private static readonly UNKNOWN_DRUG;
    private hasStateChanged;
    constructor(patients: PatientsRegister);
    private determineInteraction;
    private updateState;
    setDrugs(drugs: Drug[]): void;
    wait40Days(): void;
    report(): PatientsRegister;
}
