import { createEnvironment } from '../environment'
import { createEnvironmentKey } from '../environment.key'

describe('Environment', () => {
  it('sets and gets values by EnvironmentKey', () => {
    const env = createEnvironment()

    const key = createEnvironmentKey<number>('counter')

    env.set(key, 1)

    expect(env.get(key)).toBe(1)
  })

  it('returns undefined for unknown keys', () => {
    const env = createEnvironment()
    const key = createEnvironmentKey<string>('missing')

    expect(env.get(key)).toBeUndefined()
  })

  it('has returns true only when key exists', () => {
    const env = createEnvironment()
    const key = createEnvironmentKey<boolean>('flag')

    expect(env.has(key)).toBe(false)

    env.set(key, true)

    expect(env.has(key)).toBe(true)
  })

  it('clears a key and removes its value', () => {
    const env = createEnvironment()
    const key = createEnvironmentKey<string>('temp')

    env.set(key, 'value')

    env.clear(key)

    expect(env.has(key)).toBe(false)
    expect(env.get(key)).toBeUndefined()
  })

  it('isolates values by symbol identity, not by key name', () => {
    const env = createEnvironment()

    const keyA = createEnvironmentKey<string>('same-name')
    const keyB = createEnvironmentKey<string>('same-name')

    env.set(keyA, 'a')

    expect(env.get(keyB)).toBeUndefined()
    expect(env.has(keyB)).toBe(false)
  })

  it('supports initialization with a predefined map', () => {
    const key = createEnvironmentKey<number>('init')

    const env = createEnvironment(new Map([[key.id, 42]]))

    expect(env.get(key)).toBe(42)
    expect(env.has(key)).toBe(true)
  })

  it('overwrites existing value when setting the same key again', () => {
    const env = createEnvironment()
    const key = createEnvironmentKey<number>('value')

    env.set(key, 1)
    env.set(key, 2)

    expect(env.get(key)).toBe(2)
  })
})
