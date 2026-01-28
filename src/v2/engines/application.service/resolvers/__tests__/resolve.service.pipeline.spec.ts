import { type UseCase, Failure, Successful } from '@yagomarinho/domain-kernel'

import {
  type ApplicationContext,
  type ExtendedMiddleware,
  type Guardian,
  type ExtendedPostProcessor,
  type ErrorHandler,
  Next,
  AppError,
} from '../../../../core'

import { resolveServicePipeline } from '../resolve.service.pipeline'

const baseCtx = {} as ApplicationContext
const env = {}

describe('resolveServicePipeline', () => {
  it('executes full pipeline and returns ExtendedSuccessful', () => {
    const middleware: ExtendedMiddleware = (input, _env, context) =>
      Next(input + 1, context)

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
      context: baseCtx,
    })
  })

  it('stops pipeline and calls onError when guardian fails', async () => {
    const middleware: ExtendedMiddleware = (input, _env, context) =>
      Next(input, context)

    const guardian: Guardian = () => Failure('guardian-error')

    const handler: UseCase = () => {
      throw new Error('should not run')
    }

    const postprocessor: ExtendedPostProcessor = () => {
      throw new Error('should not run')
    }

    const onError: ErrorHandler = error => AppError.handle(`handled:${error}`)

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
      context: baseCtx,
      handled: true,
    })
  })

  it('propagates context from middleware through the entire pipeline', () => {
    const context1 = { step: 1 } as any as ApplicationContext

    const middleware: ExtendedMiddleware = input => Next(input, context1)

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
      context: context1,
    })
  })

  it('uses context from failure when failure already contains context', async () => {
    const context1 = { step: 'guardian' } as any as ApplicationContext

    const middleware: ExtendedMiddleware = (input, _env, context) =>
      Next(input, context)

    const guardian: Guardian = () =>
      ({
        tag: 'failure',
        error: 'boom',
        context: context1,
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
      context: context1,
      handled: false,
    })
  })

  it('handles async steps mixed with sync ones', async () => {
    const middleware: ExtendedMiddleware = async (input, _env, context) =>
      Next(input + 1, context)

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
      context: baseCtx,
    })
  })

  it('returns ExtendedFailure when handler fails after successful guardian', async () => {
    const middleware: ExtendedMiddleware = (input, _env, context) =>
      Next(input, context)

    const guardian: Guardian = input => Successful(input)

    const handler: UseCase = () => Failure('handler-error')

    const postprocessor: ExtendedPostProcessor = () => {
      throw new Error('should not run')
    }

    const onError: ErrorHandler = error => AppError.handle(`handled:${error}`)

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
      context: baseCtx,
      handled: true,
    })
  })
})
