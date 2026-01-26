import {
  doneDefault,
  EMPTY_ARRAY,
  identity,
} from '../../../core/application.service'
import {
  WsEventHandler,
  WsHandlersEngine,
  WsRouteConnectionEngine,
  WsRouteConnectionURI,
} from '..'

describe('WsRouteConnectionEngine', () => {
  it('declares a ws route connection with defaults', () => {
    const handlersEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlersEngine,
    })

    const handler = jest.fn()

    const route = engine.declare({
      tag: WsRouteConnectionURI,
      path: '/ws',
      handlers: [
        WsEventHandler({
          on: 'connected',
          handler,
        }),
      ],
    })

    expect(route.tag).toBe(WsRouteConnectionURI)
    expect(route.path).toBe('/ws')
    expect(route.env).toBe(identity)
    expect(route.middlewares).toEqual([])
    expect(route.postprocessors).toEqual([])
    expect(route.onError).toBe(identity)

    expect(route.onConnection).toEqual({
      middlewares: EMPTY_ARRAY,
      postprocessors: EMPTY_ARRAY,
      guardian: doneDefault,
      handler: doneDefault,
      env: identity,
      onError: identity,
      incomingAdapter: identity,
    })

    expect(route.handlers).toHaveLength(1)
    expect(route.handlers[0].handler).toBe(handler)
  })

  it('overrides onConnection defaults', () => {
    const handlersEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlersEngine,
    })

    const onConnectionGuardian = jest.fn()
    const onConnectionHandler = jest.fn()
    const incomingAdapter = jest.fn()

    const route = engine.declare({
      tag: WsRouteConnectionURI,
      path: '/custom',
      handlers: [],
      onConnection: {
        guardian: onConnectionGuardian,
        handler: onConnectionHandler,
        incomingAdapter,
      },
    })

    expect(route.onConnection).toEqual({
      guardian: onConnectionGuardian,
      handler: onConnectionHandler,
      incomingAdapter,
      env: identity,
      onError: identity,
      middlewares: EMPTY_ARRAY,
      postprocessors: EMPTY_ARRAY,
    })
  })

  it('overrides application service fields', () => {
    const env = jest.fn()
    const handler = jest.fn()
    const guardian = jest.fn()
    const incomingAdapter = jest.fn()
    const onError = jest.fn()
    const middlewares = []
    const postprocessors = []

    const handlersEngine = WsHandlersEngine()

    const engine = WsRouteConnectionEngine({
      handlersEngine,
      defaults: {
        env,
        onError,
        middlewares,
        postprocessors,
        onConnection: {
          guardian,
          handler,
          incomingAdapter,
        },
      },
    })

    const route = engine.declare({
      tag: WsRouteConnectionURI,
      path: '/override',
      handlers: [],
    })

    expect(route.env).toBe(env)
    expect(route.middlewares).toBe(middlewares)
    expect(route.postprocessors).toBe(postprocessors)
    expect(route.onError).toBe(onError)
    expect(route.onConnection.guardian).toBe(guardian)
  })

  it('binds handlers using the provided handler engine', () => {
    const handlersEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlersEngine,
    })

    const handler = jest.fn()

    const route = engine.declare({
      tag: WsRouteConnectionURI,
      path: '/bind',
      handlers: [
        WsEventHandler({
          on: 'message',
          handler,
        }),
      ],
    })

    expect(route.handlers).toHaveLength(1)
    expect(route.handlers[0].on).toBe('message')
    expect(route.handlers[0].handler).toBe(handler)
  })

  it('does not share state between declares', () => {
    const handlersEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlersEngine,
    })

    const a = engine.declare({
      tag: WsRouteConnectionURI,
      path: '/a',
      handlers: [],
    })

    const b = engine.declare({
      tag: WsRouteConnectionURI,
      path: '/b',
      handlers: [],
    })

    expect(a).not.toBe(b)
  })
})
