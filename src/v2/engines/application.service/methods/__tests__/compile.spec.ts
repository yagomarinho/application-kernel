import { Failure, Successful, UseCase } from '@yagomarinho/domain-kernel'

import {
  type ApplicationContext,
  type Middleware,
  type Guardian,
  type Postprocessor,
  type ErrorHandler,
  Next,
  createAmbient,
  createEnvView,
  AppError,
} from '../../../../core'

import { compileApplicationService } from '../compile'

describe('compileApplicationService', () => {
  const context = {} as ApplicationContext

  it('compiles an ApplicationService into an executable pipeline', () => {
    const ambient = createAmbient()

    const compiler = compileApplicationService({
      view: createEnvView(ambient),
    })

    const middleware: Middleware = (input, _env, context) =>
      Next(input + 1, context)

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
      context,
    })

    // ((1 + 1) * 2) + 3 = 7
    expect(result).toEqual({
      ...Successful('final:7'),
      context,
    })
  })

  it('passes resolved ambient to the execution pipeline', () => {
    const ambient = createAmbient()
    const view = createEnvView(ambient)

    const globalEnv = {}

    view.env.register(globalEnv)

    const compiler = compileApplicationService({
      view,
    })

    const middleware: Middleware = (input, _env, context) =>
      Next({ input }, context)

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
      context,
    })

    expect(result).toEqual({
      ...Successful({
        input: 'value',
        env: { scoped: true, base: globalEnv },
      }),
      context,
    })
  })

  it('returns ExtendedFailure when pipeline fails and onError is applied', async () => {
    const ambient = createAmbient()

    const compiler = compileApplicationService({
      view: createEnvView(ambient),
    })

    const middleware: Middleware = (input, _env, context) =>
      Next(input, context)

    const guardian: Guardian = () => Failure('guardian-error')

    const handler = () => {
      throw new Error('should not run')
    }

    const postprocessor: Postprocessor = () => {
      throw new Error('should not run')
    }

    const onError: ErrorHandler = error => AppError.handle(`handled:${error}`)

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
      context,
    })

    expect(result).toEqual({
      tag: 'failure',
      error: 'handled:guardian-error',
      context,
      handled: true,
    })
  })

  it('returns a single Compilation with job and execution', () => {
    const ambient = createAmbient()

    const compiler = compileApplicationService({
      view: createEnvView(ambient),
    })

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
