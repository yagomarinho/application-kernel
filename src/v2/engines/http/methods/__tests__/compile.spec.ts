import { UID } from '../../../../shared'
import { ServiceEngine } from '../../../application.service'
import { HttpRoute } from '../../contracts'
import { HttpRouteURI, HttpURI } from '../../uri'
import { compileHttpRoute } from '../compile'

describe('compile HttpRoute', () => {
  it('compiles a HttpRoute into a HttpCompilation', () => {
    const uid = {
      generate: jest.fn(() => 'http-job-1'),
    } as any as UID

    const executionResult = { status: 200 } as any

    const serviceEngine = {
      compile: jest.fn(() => [
        {
          job: { id: 'ignored', tag: 'ignored' },
          execution: {
            execute: () => executionResult,
          },
        },
      ]),
    } as any as ServiceEngine

    const route: HttpRoute = {
      method: 'get',
      path: '/health',
      adapters: {
        requestAdapter: (v: any) => v,
        responseAdapter: (v: any) => v,
      },
      env: (e: any) => e,
      middlewares: [],
      guardian: (i: any) => i,
      handler: () => executionResult,
      postprocessors: [],
      onError: (e: any) => e,
      tag: HttpRouteURI,
    }

    const compile = compileHttpRoute({ serviceEngine, uid })
    const [compilation] = compile(route)

    expect(uid.generate).toHaveBeenCalledTimes(1)

    expect(compilation.job).toEqual({
      id: 'http-job-1',
      tag: HttpURI,
      method: 'get',
      path: '/health',
    })

    expect(typeof compilation.execution.execute).toBe('function')
  })
})
