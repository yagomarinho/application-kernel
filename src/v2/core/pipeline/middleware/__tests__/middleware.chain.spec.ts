import type { ExecutionContext, Failure } from '@yagomarinho/domain-kernel'
import type { Middleware } from '../middleware'

import { middlewareChain } from '../middleware.chain'
import { Next, isNext } from '../next'

const ctx = {} as ExecutionContext

describe('middlewareChain', () => {
  it('returns Next(input, ctx) when chain is empty', () => {
    const chain = middlewareChain([])

    const result = chain('input', {}, ctx)

    expect(result).toEqual(Next('input', ctx))
  })

  it('executes a single middleware and forwards Next', () => {
    const middleware: Middleware = (input, _env, ctx) =>
      Next(`${input}-processed`, ctx)

    const chain = middlewareChain([middleware])

    const result = chain('data', {}, ctx)

    expect(result).toEqual(Next('data-processed', ctx))
  })

  it('executes middlewares in order, passing data forward', () => {
    const m1: Middleware<number, number> = (input, _env, ctx) =>
      Next(input + 1, ctx)

    const m2: Middleware<number, number> = (input, _env, ctx) =>
      Next(input * 2, ctx)

    const m3: Middleware<number, string> = (input, _env, ctx) =>
      Next(`value:${input}`, ctx)

    const chain = middlewareChain([m1, m2, m3])

    const result = chain(1, {}, ctx)

    // (1 + 1) * 2 = 4
    expect(result).toEqual(Next('value:4', ctx))
  })

  it('stops execution when a middleware returns Failure', () => {
    const failure: Failure = {
      tag: 'failure',
      error: 'boom',
    } as any

    const m1: Middleware = (input, _env, ctx) => Next(`${input}-ok`, ctx)

    const m2: Middleware = () => failure

    const m3: Middleware = () => {
      throw new Error('should not run')
    }

    const chain = middlewareChain([m1, m2, m3])

    const result = chain('data', {}, ctx)

    expect(result).toEqual({
      ...failure,
      ctx,
    })
  })

  it('propagates updated ctx from Next between middlewares', () => {
    const ctx1 = { step: 1 } as any as ExecutionContext
    const ctx2 = { step: 2 } as any as ExecutionContext

    const m1: Middleware = input => Next(input, ctx1)
    const m2: Middleware = input => Next(input, ctx2)

    const chain = middlewareChain([m1, m2])

    const result: any = chain('data', {}, ctx)

    expect(isNext(result)).toBe(true)
    expect(result.ctx).toBe(ctx2)
  })

  it('supports async middlewares mixed with sync ones', async () => {
    const m1: Middleware<number, number> = (input, _env, ctx) =>
      Next(input + 1, ctx)

    const m2: Middleware<number, number> = async (input, _env, ctx) =>
      Next(input * 3, ctx)

    const m3: Middleware<number, number> = (input, _env, ctx) =>
      Next(input - 2, ctx)

    const chain = middlewareChain([m1, m2, m3])

    const result = await chain(2, {}, ctx)

    // ((2 + 1) * 3) - 2 = 7
    expect(result).toEqual(Next(7, ctx))
  })

  it('attaches latest ctx to Failure returned after async chain', async () => {
    const ctx1 = { step: 1 } as any as ExecutionContext
    const ctx3 = { step: 3 } as any as ExecutionContext

    const m1: Middleware = _input => Next('ok', ctx1)

    const m2: Middleware = async () =>
      ({
        tag: 'failure',
        error: 'async-error',
      }) as any

    const m3: Middleware = () => Next('ok', ctx3)

    const chain = middlewareChain([m1, m2, m3])

    const result = await chain('input', {}, ctx)

    expect(result).toEqual({
      tag: 'failure',
      error: 'async-error',
      ctx: ctx1,
    })
  })
})
