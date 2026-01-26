import {
  Failure,
  Successful,
  UseCase,
  type ExecutionContext,
} from '@yagomarinho/domain-kernel'

import {
  type Middleware,
  type Guardian,
  type Postprocessor,
  type ErrorHandler,
  Next,
} from '../../../../core'

import { compileApplicationService } from '../compile'
import { createEnvironment } from '../../../../environment'

describe('compileApplicationService', () => {
  const ctx = {} as ExecutionContext

  it('compiles an ApplicationService into an executable pipeline', () => {
    const environment = createEnvironment()

    const compiler = compileApplicationService({ environment })

    const middleware: Middleware = (input, _env, ctx) => Next(input + 1, ctx)

    const guardian: Guardian = input => Successful(input * 2)

    const handler = (input: number) => Successful(input + 3)

    const postprocessor: Postprocessor = input => `final:${input}`

    const onError: ErrorHandler = () => {
      throw new Error('should not be called')
    }

    const [compilation] = compiler({
      env: env => env,
      middlewares: [middleware],
      guardian,
      handler,
      postprocessors: [postprocessor],
      onError,
    })

    const result = compilation.execution.execute({
      data: 1,
      context: ctx,
    })

    // ((1 + 1) * 2) + 3 = 7
    expect(result).toEqual({
      ...Successful('final:7'),
      ctx,
    })
  })

  it('passes resolved environment to the execution pipeline', () => {
    const environment = createEnvironment()

    const compiler = compileApplicationService({ environment })

    const middleware: Middleware = (input, _env, ctx) => Next({ input }, ctx)

    const guardian: Guardian = data => Successful(data)

    const handler: UseCase = ({ input }, env) => Successful({ input, env })

    const postprocessor: Postprocessor = data => data

    const onError: ErrorHandler = () => {
      throw new Error('should not be called')
    }

    const [compilation] = compiler({
      env: env => ({ scoped: true, base: env }),
      middlewares: [middleware],
      guardian,
      handler,
      postprocessors: [postprocessor],
      onError,
    })

    const result = compilation.execution.execute({
      data: 'value',
      context: ctx,
    })

    expect(result).toEqual({
      ...Successful({
        input: 'value',
        env: { scoped: true, base: environment },
      }),
      ctx,
    })
  })

  it('returns ExtendedFailure when pipeline fails and onError is applied', async () => {
    const environment = createEnvironment()

    const compiler = compileApplicationService({ environment })

    const middleware: Middleware = (input, _env, ctx) => Next(input, ctx)

    const guardian: Guardian = () => Failure('guardian-error')

    const handler = () => {
      throw new Error('should not run')
    }

    const postprocessor: Postprocessor = () => {
      throw new Error('should not run')
    }

    const onError: ErrorHandler = error => `handled:${error}`

    const [compilation] = compiler({
      env: env => env,
      middlewares: [middleware],
      guardian,
      handler,
      postprocessors: [postprocessor],
      onError,
    })

    const result = await compilation.execution.execute({
      data: 'input',
      context: ctx,
    })

    expect(result).toEqual({
      tag: 'failure',
      error: 'handled:guardian-error',
      ctx,
    })
  })

  it('returns a single Compilation with job and execution', () => {
    const environment = createEnvironment()

    const compiler = compileApplicationService({ environment })

    const [compilation] = compiler({
      env: env => env,
      middlewares: [],
      guardian: input => Successful(input),
      handler: input => Successful(input),
      postprocessors: [],
      onError: () => {
        throw new Error('should not be called')
      },
    })

    expect(compilation).toHaveProperty('job')
    expect(compilation).toHaveProperty('execution')
    expect(typeof compilation.execution.execute).toBe('function')
  })
})
