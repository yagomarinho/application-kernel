import { doneDefault, identity } from '../application.service'
import { HttpEngine, HttpMethod, HttpRouteURI } from '../http'

describe('HttpEngine', () => {
  it('mounts an http route with required fields', () => {
    const engine = HttpEngine()
    const handler = jest.fn()

    const route = engine.mount({
      method: HttpMethod.GET,
      path: '/users',
      handler,
      tag: HttpRouteURI,
    })

    expect(route.tag).toBe(HttpRouteURI)
    expect(route.method).toBe(HttpMethod.GET)
    expect(route.path).toBe('/users')
    expect(route.handler).toBe(handler)
    expect(route.env).toBe(identity)
    expect(route.middlewares).toEqual([])
    expect(route.postprocessors).toEqual([])
    expect(route.guardian).toBe(doneDefault)
    expect(route.onError).toBe(identity)
    expect(route.adapters).toEqual({
      requestAdapter: identity,
      responseAdapter: identity,
    })
  })

  it('overrides http defaults', () => {
    const requestAdapter = jest.fn()
    const responseAdapter = jest.fn()

    const env = jest.fn()
    const guardian = jest.fn()
    const handler = jest.fn()
    const onError = jest.fn()
    const middlewares = []
    const postprocessors = []

    const engine = HttpEngine({
      defaults: {
        env,
        guardian,
        middlewares,
        onError,
        postprocessors,
        adapters: { requestAdapter, responseAdapter },
      },
    })

    const route = engine.mount({
      tag: HttpRouteURI,
      method: HttpMethod.POST,
      path: '/custom',
      handler,
    })

    expect(route.tag).toBe(HttpRouteURI)
    expect(route.method).toBe(HttpMethod.POST)
    expect(route.path).toBe('/custom')
    expect(route.handler).toBe(handler)
    expect(route.env).toBe(env)
    expect(route.middlewares).toBe(middlewares)
    expect(route.postprocessors).toBe(postprocessors)
    expect(route.guardian).toBe(guardian)
    expect(route.onError).toBe(onError)
    expect(route.adapters).toEqual({
      requestAdapter,
      responseAdapter,
    })
  })

  it('overrides with http route elements', () => {
    const requestAdapter = jest.fn()
    const responseAdapter = jest.fn()

    const env = jest.fn()
    const guardian = jest.fn()
    const handler = jest.fn()
    const onError = jest.fn()
    const middlewares = []
    const postprocessors = []

    const engine = HttpEngine()

    const route = engine.mount({
      tag: HttpRouteURI,
      method: HttpMethod.POST,
      path: '/custom',
      handler,
      env,
      guardian,
      middlewares,
      onError,
      postprocessors,
      adapters: { requestAdapter, responseAdapter },
    })

    expect(route.tag).toBe(HttpRouteURI)
    expect(route.method).toBe(HttpMethod.POST)
    expect(route.path).toBe('/custom')
    expect(route.handler).toBe(handler)
    expect(route.env).toBe(env)
    expect(route.middlewares).toBe(middlewares)
    expect(route.postprocessors).toBe(postprocessors)
    expect(route.guardian).toBe(guardian)
    expect(route.onError).toBe(onError)
    expect(route.adapters).toEqual({
      requestAdapter,
      responseAdapter,
    })
  })

  it('does not share state between mounts', () => {
    const engine = HttpEngine()
    const tag = HttpRouteURI
    const method = HttpMethod.GET

    const routeA = engine.mount({
      tag,
      method,
      path: '/a',
      handler: jest.fn(),
    })

    const routeB = engine.mount({
      tag,
      method,
      path: '/b',
      handler: jest.fn(),
    })

    expect(routeA).not.toBe(routeB)
  })
})
