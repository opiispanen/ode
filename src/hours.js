import { query } from './ode.js'
import { hours } from './store.js'

hours.onChange((val) => {
    query('.hours .value').innerHTML = val;
})

query('#addHours').addEventListener('click', () => hours.value += 1)