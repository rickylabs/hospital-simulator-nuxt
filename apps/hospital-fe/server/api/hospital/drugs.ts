import {generateDrugs} from "hospital-lib/dist/es";

export default defineEventHandler((event) => {
  return generateDrugs()
});
