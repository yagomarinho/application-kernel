import type { Failure } from '@yagomarinho/domain-kernel'
import type { Middleware } from '../middleware'
import type { ApplicationContext } from '../../../data'

import { middlewareChain } from '../middleware.chain'
import { Next, isNext } from '../next'

const context = {} as ApplicationContext

describe('middlewareChain', () => {
  it('returns Next(input, context) when chain is empty', () => {
    const chain = middlewareChain([])

    const result = chain('input', {}, context)

    expect(result).toEqual(Next('input', context))
  })

  it('executes a single middleware and forwards Next', () => {
    const middleware: Middleware = (input, _env, context) =>
      Next(`${input}-processed`, context)

    const chain = middlewareChain([middleware])

    const result = chain('data', {}, context)

    expect(result).toEqual(Next('data-processed', context))
  })

  it('executes middlewares in order, passing data forward', () => {
    const m1: Middleware<number, number> = (input, _env, context) =>
      Next(input + 1, context)

    const m2: Middleware<number, number> = (input, _env, context) =>
      Next(input * 2, context)

    const m3: Middleware<number, string> = (input, _env, context) =>
      Next(`value:${input}`, context)

    const chain = middlewareChain([m1, m2, m3])

    const result = chain(1, {}, context)

    // (1 + 1) * 2 = 4
    expect(result).toEqual(Next('value:4', context))
  })

  it('stops execution when a middleware returns Failure', () => {
    const failure: Failure = {
      tag: 'failure',
      error: 'boom',
    }

    const m1: Middleware = (input, _env, context) =>
      Next(`${input}-ok`, context)

    const m2: Middleware = () => failure

    const m3: Middleware = () => {
      throw new Error('should not run')
    }

    const chain = middlewareChain([m1, m2, m3])

    const result = chain('data', {}, context)

    expect(result).toEqual({
      ...failure,
      context,
      handled: false,
    })
  })

  it('propagates updated context from Next between middlewares', () => {
    const context1 = { step: 1 } as any as ApplicationContext
    const context2 = { step: 2 } as any as ApplicationContext

    const m1: Middleware = input => Next(input, context1)
    const m2: Middleware = input => Next(input, context2)

    const chain = middlewareChain([m1, m2])

    const result: any = chain('data', {}, context)

    expect(isNext(result)).toBe(true)
    expect(result.context).toBe(context2)
  })

  it('supports async middlewares mixed with sync ones', async () => {
    const m1: Middleware<number, number> = (input, _env, context) =>
      Next(input + 1, context)

    const m2: Middleware<number, number> = async (input, _env, context) =>
      Next(input * 3, context)

    const m3: Middleware<number, number> = (input, _env, context) =>
      Next(input - 2, context)

    const chain = middlewareChain([m1, m2, m3])

    const result = await chain(2, {}, context)

    // ((2 + 1) * 3) - 2 = 7
    expect(result).toEqual(Next(7, context))
  })

  it('attaches latest context to Failure returned after async chain', async () => {
    const context1 = { step: 1 } as any as ApplicationContext
    const context3 = { step: 3 } as any as ApplicationContext

    const m1: Middleware = _input => Next('ok', context1)

    const m2: Middleware = async () =>
      ({
        tag: 'failure',
        error: 'async-error',
      }) as any

    const m3: Middleware = () => Next('ok', context3)

    const chain = middlewareChain([m1, m2, m3])

    const result = await chain('input', {}, context)

    expect(result).toEqual({
      tag: 'failure',
      error: 'async-error',
      context: context1,
      handled: false,
    })
  })
})
