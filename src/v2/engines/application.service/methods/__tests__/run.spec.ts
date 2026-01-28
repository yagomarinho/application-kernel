import {
  type ApplicationContext,
  type ApplicationPayload,
  type Job,
  createAmbient,
  createApplicationView,
} from '../../../../core'
import { runApplicationService } from '../run'

describe('run application service testing', () => {
  const context = {} as ApplicationContext

  function createJob(id: string, tag: string): Job {
    return {
      id,
      tag,
    }
  }

  it('resolves job execution from view and executes it with payload', () => {
    const ambient = createAmbient()
    const view = createApplicationView(ambient)

    const job = createJob('job-1', 'test')

    const executionResult = { ok: true }

    view.compilation.attach({
      job,
      execution: {
        execute: (payload: ApplicationPayload) => ({
          payload,
          result: executionResult,
        }),
      },
    })

    const run = runApplicationService({ view })

    const payload: ApplicationPayload = {
      data: 'input',
      context,
    }

    const result = run(job, payload)

    expect(result).toEqual({
      payload,
      result: executionResult,
    })
  })

  it('throws when job is not registered in the application view', () => {
    const ambient = createAmbient()
    const view = createApplicationView(ambient)

    const job = createJob('missing-job', 'test')

    const run = runApplicationService({ view })

    expect(() =>
      run(job, {
        data: 'input',
        context,
      }),
    ).toThrow('No compilation found for job missing-job')
  })

  it('throws when job tag does not match the registered compilation', () => {
    const ambient = createAmbient()
    const view = createApplicationView(ambient)

    const registeredJob = createJob('job-1', 'correct')

    view.compilation.attach({
      job: registeredJob,
      execution: {
        execute: payload => payload.data,
      },
    })

    const run = runApplicationService({ view })

    const wrongTagJob = createJob('job-1', 'wrong')

    expect(() =>
      run(wrongTagJob, {
        data: 'input',
        context,
      }),
    ).toThrow('Job tag mismatch')
  })

  it('does not alter payload before passing it to execution', () => {
    const ambient = createAmbient()
    const view = createApplicationView(ambient)

    const job = createJob('job-2', 'test')

    let receivedPayload: ApplicationPayload | undefined

    view.compilation.attach({
      job,
      execution: {
        execute: payload => {
          receivedPayload = payload
          return 'ok'
        },
      },
    })

    const run = runApplicationService({ view })

    const payload: ApplicationPayload = {
      data: { value: 123 },
      context,
    }

    run(job, payload)

    expect(receivedPayload).toBe(payload)
  })
})
