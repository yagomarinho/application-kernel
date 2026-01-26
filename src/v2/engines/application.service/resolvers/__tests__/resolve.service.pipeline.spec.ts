import {
  type ExecutionContext,
  type UseCase,
  Failure,
  Successful,
} from '@yagomarinho/domain-kernel'

import {
  type ExtendedMiddleware,
  type Guardian,
  type ExtendedPostProcessor,
  type ErrorHandler,
  Next,
} from '../../../../core'

import { resolveServicePipeline } from '../resolve.service.pipeline'

const baseCtx = {} as ExecutionContext
const env = {}

describe('resolveServicePipeline', () => {
  it('executes full pipeline and returns ExtendedSuccessful', () => {
    const middleware: ExtendedMiddleware = (input, _env, ctx) =>
      Next(input + 1, ctx)

    const guardian: Guardian = input => Successful(input * 2)

    const handler: UseCase = input => Successful(input + 3)

    const postprocessor: ExtendedPostProcessor = input =>
      Successful(`result:${input}`)

    const onError: ErrorHandler = () => {
      throw new Error('should not be called')
    }

    const pipeline = resolveServicePipeline(
      middleware,
      guardian,
      handler,
      postprocessor,
      onError,
    )

    const result = pipeline(1, env, baseCtx)

    // ((1 + 1) * 2) + 3 = 7
    expect(result).toEqual({
      ...Successful('result:7'),
      ctx: baseCtx,
    })
  })

  it('stops pipeline and calls onError when guardian fails', async () => {
    const middleware: ExtendedMiddleware = (input, _env, ctx) =>
      Next(input, ctx)

    const guardian: Guardian = () => Failure('guardian-error')

    const handler: UseCase = () => {
      throw new Error('should not run')
    }

    const postprocessor: ExtendedPostProcessor = () => {
      throw new Error('should not run')
    }

    const onError: ErrorHandler = error => `handled:${error}`

    const pipeline = resolveServicePipeline(
      middleware,
      guardian,
      handler,
      postprocessor,
      onError,
    )

    const result = await pipeline('input', env, baseCtx)

    expect(result).toEqual({
      tag: 'failure',
      error: 'handled:guardian-error',
      ctx: baseCtx,
    })
  })

  it('propagates ctx from middleware through the entire pipeline', () => {
    const ctx1 = { step: 1 } as any as ExecutionContext

    const middleware: ExtendedMiddleware = input => Next(input, ctx1)

    const guardian: Guardian = input => Successful(input)

    const handler: UseCase = input => Successful(input)

    const postprocessor: ExtendedPostProcessor = input => Successful(input)

    const onError: ErrorHandler = () => {
      throw new Error('should not be called')
    }

    const pipeline = resolveServicePipeline(
      middleware,
      guardian,
      handler,
      postprocessor,
      onError,
    )

    const result = pipeline('data', env, baseCtx)

    expect(result).toEqual({
      ...Successful('data'),
      ctx: ctx1,
    })
  })

  it('uses ctx from failure when failure already contains ctx', async () => {
    const ctx1 = { step: 'guardian' } as any as ExecutionContext

    const middleware: ExtendedMiddleware = (input, _env, ctx) =>
      Next(input, ctx)

    const guardian: Guardian = () =>
      ({
        tag: 'failure',
        error: 'boom',
        ctx: ctx1,
      }) as any

    const handler: UseCase = () => {
      throw new Error('should not run')
    }

    const postprocessor: ExtendedPostProcessor = () => {
      throw new Error('should not run')
    }

    const onError: ErrorHandler = error => `mapped:${error}`

    const pipeline = resolveServicePipeline(
      middleware,
      guardian,
      handler,
      postprocessor,
      onError,
    )

    const result = await pipeline('input', env, baseCtx)

    expect(result).toEqual({
      tag: 'failure',
      error: 'mapped:boom',
      ctx: ctx1,
    })
  })

  it('handles async steps mixed with sync ones', async () => {
    const middleware: ExtendedMiddleware = async (input, _env, ctx) =>
      Next(input + 1, ctx)

    const guardian: Guardian = input => Successful(input * 2)

    const handler: UseCase = async input => Successful(input + 5)

    const postprocessor: ExtendedPostProcessor = input => Successful(input - 3)

    const onError: ErrorHandler = () => {
      throw new Error('should not be called')
    }

    const pipeline = resolveServicePipeline(
      middleware,
      guardian,
      handler,
      postprocessor,
      onError,
    )

    const result = await pipeline(1, env, baseCtx)

    // ((1 + 1) * 2) + 5 - 3 = 6
    expect(result).toEqual({
      ...Successful(6),
      ctx: baseCtx,
    })
  })

  it('returns ExtendedFailure when handler fails after successful guardian', async () => {
    const middleware: ExtendedMiddleware = (input, _env, ctx) =>
      Next(input, ctx)

    const guardian: Guardian = input => Successful(input)

    const handler: UseCase = () => Failure('handler-error')

    const postprocessor: ExtendedPostProcessor = () => {
      throw new Error('should not run')
    }

    const onError: ErrorHandler = error => `handled:${error}`

    const pipeline = resolveServicePipeline(
      middleware,
      guardian,
      handler,
      postprocessor,
      onError,
    )

    const result = await pipeline('data', env, baseCtx)

    expect(result).toEqual({
      tag: 'failure',
      error: 'handled:handler-error',
      ctx: baseCtx,
    })
  })
})
