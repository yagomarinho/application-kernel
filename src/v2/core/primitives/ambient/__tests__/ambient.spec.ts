import { createAmbient } from '../create.ambient'
import { createAmbientKey } from '../create.ambient.key'

describe('Environment', () => {
  it('sets and gets values by EnvironmentKey', () => {
    const env = createAmbient()

    const key = createAmbientKey<number>('counter')

    env.set(key, 1)

    expect(env.get(key)).toBe(1)
  })

  it('returns undefined for unknown keys', () => {
    const env = createAmbient()
    const key = createAmbientKey<string>('missing')

    expect(env.get(key)).toBeUndefined()
  })

  it('has returns true only when key exists', () => {
    const env = createAmbient()
    const key = createAmbientKey<boolean>('flag')

    expect(env.has(key)).toBe(false)

    env.set(key, true)

    expect(env.has(key)).toBe(true)
  })

  it('clears a key and removes its value', () => {
    const env = createAmbient()
    const key = createAmbientKey<string>('temp')

    env.set(key, 'value')

    env.clear(key)

    expect(env.has(key)).toBe(false)
    expect(env.get(key)).toBeUndefined()
  })

  it('isolates values by symbol identity, not by key name', () => {
    const env = createAmbient()

    const keyA = createAmbientKey<string>('same-name')
    const keyB = createAmbientKey<string>('same-name')

    env.set(keyA, 'a')

    expect(env.get(keyB)).toBeUndefined()
    expect(env.has(keyB)).toBe(false)
  })

  it('supports initialization with a predefined map', () => {
    const key = createAmbientKey<number>('init')

    const env = createAmbient(new Map([[key.id, 42]]))

    expect(env.get(key)).toBe(42)
    expect(env.has(key)).toBe(true)
  })

  it('overwrites existing value when setting the same key again', () => {
    const env = createAmbient()
    const key = createAmbientKey<number>('value')

    env.set(key, 1)
    env.set(key, 2)

    expect(env.get(key)).toBe(2)
  })
})
