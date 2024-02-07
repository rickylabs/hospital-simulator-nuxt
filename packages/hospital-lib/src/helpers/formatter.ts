import {getRandomInt} from "./random-int.ts";
import {Quarantine, Drug, PatientState} from "../quarantine.ts";

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
    const quarantine = new Quarantine({});
    let drugCombination = null;
    let interaction = null;

    // Iterate until a valid drug combination is found
    do {
        const numberOfDrugs = getRandomInt(1, treatment.length);
        const drugs = [];
        for (let i = 0; i < numberOfDrugs; i++) {
            const randomIndex = getRandomInt(0, treatment.length - 1);
            drugs.push(treatment[randomIndex]);
        }
        drugCombination = drugs.sort((a, b) => a.localeCompare(b)).join(',');
        interaction = quarantine.determineInteraction(drugs);
    } while (interaction === null);

    return drugCombination;
}