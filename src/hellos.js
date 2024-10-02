import { query } from './ode.js'
import { hellos } from './store.js'

hellos.onChange((val) => {
    const ul = document.createElement('ul')
    
    val.forEach((row, index) => {
        const li = document.createElement('li')

        li.innerHTML = `<li>Hello (${ index }): ${ row }</li>`
        li.style.cursor = 'pointer'
        li.style.marginBottom = '7px'
        li.addEventListener('click', () => {
            hellos.value.splice(index, 1)
        })

        ul.append(li)
    })

    query('.hellos-container').replaceChildren(ul)
})