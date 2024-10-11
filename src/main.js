import { query } from './ode.js'
import { 
    hours, 
    minutes, 
    seconds,
    array,
    obj
} from './store.js'
import './hours.js'
import './minutes.js'
import './seconds.js'
import './array.js'
import './object.js'
import { products } from './misc.js'

const inMilliseconds = () => hours.value * 3600000 
    + minutes.value * 60000 
    + seconds.value * 1000;
const updateMilliseconds = () => {
    query('.milliseconds .value').innerHTML = inMilliseconds();
}

hours.onChange(() => updateMilliseconds())
minutes.onChange(() => {
    updateMilliseconds()
    array.value.push(new Date())
})
seconds.onChange(() => {
    updateMilliseconds()

    const rand = Math.floor(Math.random() * 4)
    const newProduct = products[rand]
    
    obj.value.productId = newProduct.productId
    obj.value.name = newProduct.name
})

const loop = () => {
    seconds.value += 1;

    setTimeout(() => loop(), 1000)
}

loop()

document.querySelector('.toggle-mode')
.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
})