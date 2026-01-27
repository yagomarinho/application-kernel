import { createEnvView, globalEnvKey } from '../implementations/env.view'
import type { Ambient } from '../../ambient'

describe('createEnvView', () => {
  function createAmbient(): Ambient {
    const store = new Map<symbol, any>()

    return {
      set(key, value) {
        store.set(key.id, value)
      },
      get(key) {
        return store.get(key.id)
      },
    } as Ambient
  }

  it('registers environment in ambient using globalEnvKey', () => {
    const ambient = createAmbient()
    const view = createEnvView(ambient)

    const env = { region: 'test' }

    view.env.register(env)

    expect(ambient.get(globalEnvKey)).toBe(env)
  })

  it('resolves environment through provided access function', () => {
    const ambient = createAmbient()
    const view = createEnvView(ambient)

    const env = { feature: true }

    view.env.register(env)

    const result = view.env.resolve(current => ({
      ...current,
      resolved: true,
    }))

    expect(result).toEqual({
      feature: true,
      resolved: true,
    })
  })

  it('passes undefined to resolver if no environment was registered', () => {
    const ambient = createAmbient()
    const view = createEnvView(ambient)

    const result = view.env.resolve(env => env)

    expect(result).toBeUndefined()
  })

  it('allows overwriting the registered environment', () => {
    const ambient = createAmbient()
    const view = createEnvView(ambient)

    const env1 = { version: 1 }
    const env2 = { version: 2 }

    view.env.register(env1)
    view.env.register(env2)

    const result = view.env.resolve(env => env)

    expect(result).toBe(env2)
  })
})
