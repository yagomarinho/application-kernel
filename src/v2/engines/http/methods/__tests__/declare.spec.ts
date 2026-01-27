import { Result } from '@yagomarinho/domain-kernel'
import { declareHttpRoute } from '../declare'

describe('declareHttpRoute', () => {
  it('declares an HttpRoute using defaults and resolved adapters', () => {
    const defaults: any = {
      env: (e: any) => e,
      middlewares: [],
      guardian: (i: any) => i,
      postprocessors: [],
      onError: (e: any) => e,
      adapters: {
        requestAdapter: (v: any) => ({ wrapped: v }),
        responseAdapter: (v: any) => ({ response: v }),
      },
    }

    const declaredService = {
      env: defaults.env,
      middlewares: [],
      guardian: defaults.guardian,
      handler: () => 'ok',
      postprocessors: [],
      onError: defaults.onError,
    }

    const serviceEngine = {
      declare: jest.fn(() => declaredService),
    } as any

    const declare = declareHttpRoute({
      defaults,
      serviceEngine,
    })

    const route = declare({
      tag: 'http.route',
      method: 'get',
      path: '/health',
      handler: () => Result.ok('ok'),
    })

    expect(serviceEngine.declare).toHaveBeenCalledWith(
      expect.objectContaining({
        handler: expect.any(Function),
      }),
      { defaults },
    )

    expect(route.method).toBe('get')
    expect(route.path).toBe('/health')
    expect(route.tag).toBe('http.route')

    expect(route.adapters.requestAdapter).toBe(defaults.adapters.requestAdapter)
    expect(route.adapters.responseAdapter).toBe(
      defaults.adapters.responseAdapter,
    )

    expect(route.env).toBe(declaredService.env)
    expect(route.guardian).toBe(declaredService.guardian)
    expect(route.handler).toBe(declaredService.handler)
    expect(route.onError).toBe(declaredService.onError)
  })

  it('overrides default adapters when declaration provides them', () => {
    const defaultRequest = (v: any) => v
    const defaultResponse = (v: any) => v

    const customRequest = (v: any) => `custom:${v}`
    const customResponse = (v: any) => `custom:${v}`

    const defaults = {
      env: (e: any) => e,
      middlewares: [],
      guardian: (i: any) => i,
      postprocessors: [],
      onError: (e: any) => e,
      adapters: {
        requestAdapter: defaultRequest,
        responseAdapter: defaultResponse,
      },
    }

    const serviceEngine = {
      declare: jest.fn((d: any) => d),
    } as any

    const declare = declareHttpRoute({ defaults, serviceEngine })

    const route = declare({
      tag: 'http.route',
      method: 'post',
      path: '/custom',
      handler: () => Result.ok(),
      adapters: {
        requestAdapter: customRequest,
        responseAdapter: customResponse as any,
      },
    })

    expect(route.adapters.requestAdapter).toBe(customRequest)
    expect(route.adapters.responseAdapter).toBe(customResponse)
  })
})
