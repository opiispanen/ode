import { query } from './ode.js'
import { obj } from './store.js'

const update = (val) => {
    query('.object-container').innerHTML = `<code><pre>
{
    productId: ${ val.productId },
    name: ${ val.name }
}
</pre></code>`
}

obj.onChange((val) => {
    update(val)
})

update(obj.value)