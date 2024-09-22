import { query } from './ode.js'
import { hours, minutes } from './store.js'

minutes.onChange((val) => {
    if (val >= 60) {
        hours.value += 1;
        minutes.value = val % 60;
    }

    query('.minutes .value').innerHTML = minutes.value;
})

query('#addMinutes').addEventListener('click', () => minutes.value += 5)