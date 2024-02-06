import {generatePatientsStatus} from "hospital-lib/dist/es";

export default defineEventHandler((event) => {
  return generatePatientsStatus({min: 0, max: 3})
});
