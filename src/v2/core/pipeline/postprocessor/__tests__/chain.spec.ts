import type { Postprocessor } from '../postprocessor'

import { type ExecutionContext, Successful } from '@yagomarinho/domain-kernel'

import { postprocessorsChain } from '../postprocessor.chain'

const ctx = {} as ExecutionContext

describe('postprocessors chain unit testing', () => {
  it('returns input wrapped in Successful when chain is empty', () => {
    const chain = postprocessorsChain([])

    const input = { foo: 'bar' }
    const result = chain(input, {}, ctx)

    expect(result).toEqual(expect.objectContaining(Successful(input)))
  })

  it('executes a single postprocessor and wraps result in Successful', () => {
    const processor: Postprocessor = input => ({
      ...input,
      processed: true,
    })

    const chain = postprocessorsChain([processor])

    const input = { value: 1 }
    const result = chain(input, {}, ctx)

    expect(result).toEqual(
      expect.objectContaining(
        Successful({
          value: 1,
          processed: true,
        }),
      ),
    )
  })

  it('executes postprocessors in order, passing output to next', () => {
    const p1: Postprocessor = (input: number) => input + 1
    const p2: Postprocessor = (input: number) => input * 2
    const p3: Postprocessor = (input: number) => `result:${input}`

    const chain = postprocessorsChain([p1, p2, p3])

    const result = chain(1, {}, ctx)

    // (1 + 1) * 2 = 4 → "result:4"
    expect(result).toEqual(expect.objectContaining(Successful('result:4')))
  })

  it('passes env and ctx to all postprocessors', () => {
    const env = { region: 'test' }
    const calls: Array<{ env: any; ctx: ExecutionContext }> = []

    const processor: Postprocessor = (input, env, ctx) => {
      calls.push({ env, ctx })
      return input
    }

    const chain = postprocessorsChain([processor, processor])

    chain('input', env, ctx)

    expect(calls).toHaveLength(2)
    expect(calls[0]).toEqual({ env, ctx })
    expect(calls[1]).toEqual({ env, ctx })
  })

  it('always returns Successful, even if processors already return Resolvable', () => {
    const processor: Postprocessor = input => Successful(input)

    const chain = postprocessorsChain([processor])

    const result = chain('value', {}, ctx)

    // contrato do ExtendedPostProcessor
    expect(result).toEqual(
      expect.objectContaining(Successful(Successful('value'))),
    )
  })
})
