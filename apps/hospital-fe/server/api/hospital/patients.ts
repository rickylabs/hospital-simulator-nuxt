import {generatePatientsStatus} from 'hospital-lib/dist/es'

export default defineEventHandler(() => {
  return generatePatientsStatus({min: 0, max: 3})
})
