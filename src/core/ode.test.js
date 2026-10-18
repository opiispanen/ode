// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { createProxy } from './ode.js'

describe('onChange unsubscribe', () => {
    it('removes the right subscriber after earlier unsubscribes', () => {
        const state = createProxy(0)
        const a = vi.fn()
        const b = vi.fn()
        const c = vi.fn()

        const offA = state.onChange(a)
        state.onChange(b)
        offA()
        // Added after an unsubscribe: must not collide with b's or c's identity
        const offC = state.onChange(c)

        offC()
        state.value = 1

        expect(a).not.toHaveBeenCalled()
        expect(b).toHaveBeenCalledWith(1)
        expect(c).not.toHaveBeenCalled()
    })

    it('treats a second unsubscribe call as a no-op', () => {
        const state = createProxy(0)
        const a = vi.fn()
        const b = vi.fn()

        const offA = state.onChange(a)
        state.onChange(b)

        offA()
        offA()
        state.value = 1

        expect(a).not.toHaveBeenCalled()
        expect(b).toHaveBeenCalledTimes(1)
    })

    it('keeps remaining subscribers firing for objects too', () => {
        const state = createProxy({ n: 0 })
        const a = vi.fn()
        const b = vi.fn()

        const offA = state.onChange(a)
        state.onChange(b)

        offA()
        offA()
        state.value.n = 1

        expect(a).not.toHaveBeenCalled()
        expect(b).toHaveBeenCalledTimes(1)
    })

    it('supports registering the same callback twice independently', () => {
        const state = createProxy(0)
        const cb = vi.fn()

        const off1 = state.onChange(cb)
        state.onChange(cb)

        off1()
        state.value = 1

        expect(cb).toHaveBeenCalledTimes(1)
    })
})
