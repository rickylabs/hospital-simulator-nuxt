import {getRandomInt, Drug} from "hospital-lib/dist/es/index";
import _ from "lodash";

const treatments = Object.values(Drug);

export default defineEventHandler((event) => {
  const randomIndexOne = getRandomInt(0, treatments.length - 1);
  const randomIndexTwo = getRandomInt(0, treatments.length - 1);
  return randomIndexOne !== randomIndexTwo ?
    treatments[randomIndexOne] + "," + treatments[randomIndexTwo]
    : treatments[randomIndexOne];
});
