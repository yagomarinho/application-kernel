import { Result, Successful } from '@yagomarinho/domain-kernel'
import { createHttpEngine } from '../create.http.engine'

describe('createHttpEngine', () => {
  it('creates an HttpEngine with wired capabilities', () => {
    const uid = {
      generate: () => 'uid-1',
    } as any

    const execution = {
      execute: ({ data }: any) => Successful(data),
    }

    const serviceEngine = {
      declare: jest.fn((config: any) => config),
      compile: jest.fn(() => [
        {
          job: { id: 'uid-1', tag: 'http.route' },
          execution,
        },
      ]),
    } as any

    const view = {
      jobs: {
        list: jest.fn(() => [{ id: 'uid-1', tag: 'http.route' }]),
        resolve: jest.fn(() => execution),
      },
    } as any

    const defaults = {
      adapters: {
        requestAdapter: (v: any) => v,
        responseAdapter: (v: any) => v,
      },
    }

    const engine = createHttpEngine({
      defaults,
      serviceEngine,
      uid,
      view,
    })

    expect(engine).toHaveProperty('declare')
    expect(engine).toHaveProperty('compile')
    expect(engine).toHaveProperty('jobs')
    expect(engine).toHaveProperty('run')

    // declare
    const route = engine.declare({
      tag: 'http.route',
      method: 'get',
      path: '/health',
      handler: () => Result.ok('ok'),
    })

    expect(route.method).toBe('get')
    expect(route.path).toBe('/health')
    expect(route.adapters.requestAdapter).toBe(defaults.adapters.requestAdapter)

    // compile
    const compilations = engine.compile(route)
    expect(compilations).toHaveLength(1)
    expect(compilations[0].job.id).toBe('uid-1')

    // jobs
    const jobs = engine.jobs()
    expect(jobs).toEqual([{ id: 'uid-1', tag: 'http.route' }])

    // run
    const result = engine.run(
      { id: 'uid-1', tag: 'http', method: 'get', path: '/health' },
      {
        data: 'payload' as any,
        context: {} as any,
      },
    )

    expect(result).toEqual(expect.objectContaining(Successful('payload')))
  })
})
