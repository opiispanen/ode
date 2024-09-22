import { query } from './ode.js'
import { minutes, seconds } from './store.js'

seconds.onChange((val) => {
    if (val >= 60) {
        minutes.value += 1;
        seconds.value = val % 60;
    }
    
    query('.seconds .value').innerHTML = seconds.value;
})

query('#addSeconds').addEventListener('click', () => seconds.value += 15)