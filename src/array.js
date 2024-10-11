import { query } from './ode.js'
import { array } from './store.js'

array.onChange((val) => {
    const ul = document.createElement('ul')
    
    val.forEach((row, index) => {
        const li = document.createElement('li')

        li.innerHTML = `Hello (${ index }): ${ row }`
        li.style.cursor = 'pointer'
        li.style.marginBottom = '7px'
        li.addEventListener('click', () => {
            array.value.splice(index, 1)
        })

        ul.append(li)
    })

    query('.array-container').replaceChildren(ul)
})