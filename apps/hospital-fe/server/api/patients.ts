import {getRandomInt, PatientState} from "hospital-lib/dist/es/index";

const status = Object.values(PatientState).filter(state => state !== PatientState.Dead);
const MIN = 0;
const MAX = 3;

export default defineEventHandler((event) => {
  const patients = status.flatMap(status => new Array(getRandomInt(MIN, MAX)).fill(status)).join(',');
  console.log(status, patients);
  return patients;
});
