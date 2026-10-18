# Ode.js reactive library

[![CI](https://github.com/opiispanen/ode/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/opiispanen/ode/actions/workflows/ci.yml)

Disclaimer: Please do not use this in production! Educational purposes only.

This is the third edition of the Ode.js reactive library that earlier had some templating and proxies. This edition is based on my blog about reactive javascript: [here.](https://opiispanen.com/blog/reactive-vanillajs)

The big idea is to use proxies to detect changes and register callback functions to react on those changes. No templating, just use JS DOM features.

## Install

The package is private and not published to npm. The library is a single file with no dependencies, so copy [`src/core/ode.js`](src/core/ode.js) into your project and import it:

```js
import { createProxy, query } from './ode.js'
```

To run the demo and the tests from this repository (Node 20.19+ or 22.12+):

```sh
yarn install
yarn dev     # start the demo with Vite
yarn build   # production build
yarn test    # run the tests for src/core/ode.js
```

## Usage

### `createProxy(initialValue)`

Wraps a value and returns an object with:

- `value`: the current value. Read it and assign to it as usual.
- `onChange(callback)`: registers a callback that runs on every change and returns a function that unsubscribes it.

```js
import { createProxy, query } from './ode.js'

const count = createProxy(0)

const unsubscribe = count.onChange((val) => {
    query('.count').innerHTML = val
})

count.value += 1 // the callback runs with 1

unsubscribe()
count.value += 1 // nothing happens
```

Objects and arrays work the same way. The callback receives the object or array itself:

```js
const items = createProxy([])

items.onChange((list) => {
    query('.items').replaceChildren(
        ...list.map((item) => {
            const li = document.createElement('li')

            li.textContent = item

            return li
        })
    )
})

items.value.push('first')
items.value.splice(0, 1)

const product = createProxy({ productId: 1, name: 'Hat' })

product.onChange((p) => console.log(p.name))
product.value.name = 'Cap'
```

Functions cannot be wrapped and throw an error.

### `query(selector)`

A shortcut for `document.querySelector`.

### Limitations

- Only changes made directly to the wrapped value are detected. Nested objects are not tracked, so `state.value.a.b = 1` does not notify.
- Subscribers can be registered with `onChange` but there is no way to read the old value.

See [`src/`](src) for a full demo with a clock, an array and an object, and [`todo.md`](todo.md) for planned improvements.