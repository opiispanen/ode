import { query } from './ode.js'
import { hours, minutes, seconds } from './store.js'
import './hours.js'
import './minutes.js'
import './seconds.js'

const inMilliseconds = () => hours.value * 3600000 
    + minutes.value * 60000 
    + seconds.value * 1000;
const updateMilliseconds = () => {
    query('.milliseconds .value').innerHTML = inMilliseconds();
}

hours.onChange(() => updateMilliseconds())
minutes.onChange(() => updateMilliseconds())
seconds.onChange(() => updateMilliseconds())

const loop = () => {
    seconds.value += 1;

    setTimeout(() => loop(), 1000)
}

loop()