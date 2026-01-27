import { type ExecutionContext, Successful } from '@yagomarinho/domain-kernel'
import {
  type Guardian,
  type Job,
  createAmbient,
  createRuntimeView,
} from '../../../core'
import { createServiceEngine } from '../service.engine'

describe('service engine testing', () => {
  const context = {} as ExecutionContext

  function createJob(id: string, tag: string): Job {
    return { id, tag } as Job
  }

  it('declares, compiles, attaches and runs an application service end-to-end', async () => {
    const ambient = createAmbient()
    const view = createRuntimeView(ambient)

    const engine = createServiceEngine({
      view,
      defaults: {
        env: env => env,
        middlewares: [],
        guardian: input => Successful(input),
        postprocessors: [],
        onError: error => `handled:${error}`,
      },
    })

    const service = engine.declare({
      handler: input => Successful(input + 1),
    })

    const [compilation] = engine.compile(service)

    const job = createJob('job-1', 'math')

    view.compilation.attach({
      job,
      execution: compilation.execution,
    })

    const result = await engine.run(job, {
      data: 1,
      context,
    })

    expect(result).toEqual({
      ...Successful(2),
      context,
    })
  })

  it('uses overridden defaults when provided at declare-time', () => {
    const ambient = createAmbient()
    const view = createRuntimeView(ambient)

    const engine = createServiceEngine({
      view,
      defaults: {
        env: env => env,
        middlewares: [],
        guardian: input => Successful(input),
        postprocessors: [],
        onError: () => {
          throw new Error('should not be called')
        },
      },
    })

    const customGuardian: Guardian = input => Successful(input * 2)

    const service = engine.declare(
      {
        handler: input => Successful(input + 1),
      },
      {
        defaults: {
          env: env => env,
          middlewares: [],
          guardian: customGuardian,
          postprocessors: [],
          onError: error => Successful(error),
        },
      },
    )

    expect(service.guardian).toBe(customGuardian)
  })

  it('lists jobs through jobsApplicationService', () => {
    const ambient = createAmbient()
    const view = createRuntimeView(ambient)

    const engine = createServiceEngine({
      view,
      defaults: {
        env: env => env,
        middlewares: [],
        guardian: input => Successful(input),
        postprocessors: [],
        onError: error => Successful(error),
      },
    })

    const job1 = createJob('job-1', 'a')
    const job2 = createJob('job-2', 'b')

    view.compilation.attach({
      job: job1,
      execution: { execute: () => null },
    })

    view.compilation.attach({
      job: job2,
      execution: { execute: () => null },
    })

    expect(engine.jobs()).toEqual(expect.arrayContaining([job1, job2]))
  })

  it('propagates failure through onError when execution fails', async () => {
    const ambient = createAmbient()
    const view = createRuntimeView(ambient)

    const engine = createServiceEngine({
      view,
      defaults: {
        env: env => env,
        middlewares: [],
        guardian: () => {
          throw new Error('should not run')
        },
        postprocessors: [],
        onError: error => `mapped:${error}`,
      },
    })

    const service = engine.declare({
      handler: () => {
        throw 'boom'
      },
    })

    const [compilation] = engine.compile(service)

    const job = createJob('job-error', 'err')

    view.compilation.attach({
      job,
      execution: compilation.execution,
    })

    const result = await engine.run(job, {
      data: 'input',
      context,
    })

    expect(result).toEqual({
      tag: 'failure',
      error: 'mapped:boom',
      context,
    })
  })

  it('exposes declare, compile, jobs and run as stable engine surface', () => {
    const ambient = createAmbient()
    const view = createRuntimeView(ambient)

    const engine = createServiceEngine({
      view,
      defaults: {},
    })

    expect(typeof engine.declare).toBe('function')
    expect(typeof engine.compile).toBe('function')
    expect(typeof engine.jobs).toBe('function')
    expect(typeof engine.run).toBe('function')
  })
})
