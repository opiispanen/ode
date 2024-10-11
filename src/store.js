import { createProxy } from './ode.js'
import { products } from './misc.js'

export const hours = createProxy(0)
export const minutes = createProxy(0)
export const seconds = createProxy(0)
export const array = createProxy([])
export const obj = createProxy(products[0])