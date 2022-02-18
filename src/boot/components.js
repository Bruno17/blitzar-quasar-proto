import { boot } from 'quasar/wrappers'
import { BlitzForm } from 'blitzar'

export default boot(async ({ app }) => {
  app.component('BlitzForm', BlitzForm)
})
