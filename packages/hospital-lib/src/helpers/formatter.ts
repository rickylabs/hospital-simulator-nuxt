import {getRandomInt} from "./random-int.ts";
import {Drug, PatientState} from "../quarantine.ts";

const treatment = Object.values(Drug);
const status = Object.values(PatientState).filter(state => state !== PatientState.Dead);
const MIN = 0;
const MAX = 3;

interface PatientStatusParams {
    min: number;
    max: number;
}

export function generatePatientsStatus({min, max}: PatientStatusParams) {
    const minNumber = (min && min > 0) ? min : MIN
    const maxNumber = (max && max > 0) ? max : MAX
    return status.flatMap(status =>
        new Array(getRandomInt(minNumber, maxNumber)).fill(status)).join(',');
}

export function generateDrugs () {
    const randomIndexOne = getRandomInt(0, treatment.length - 1);
    const randomIndexTwo = getRandomInt(0, treatment.length - 1);
    return randomIndexOne !== randomIndexTwo ?
        treatment[randomIndexOne] + "," + treatment[randomIndexTwo]
        : treatment[randomIndexOne];
}