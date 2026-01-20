import { doneDefault, identity } from '../application.service'
import {
  WsEventHandler,
  WsHandlersEngine,
  WsRouteConnectionEngine,
  WsRouteConnectionURI,
} from '../ws'

describe('WsRouteConnectionEngine', () => {
  it('mounts a ws route connection with defaults', () => {
    const handlerEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlerEngine,
    })

    const handler = jest.fn()

    const route = engine.mount({
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
      guardian: doneDefault,
      handler: doneDefault,
      incomingAdapter: identity,
    })

    expect(route.handlers).toHaveLength(1)
    expect(route.handlers[0].handler).toBe(handler)
  })

  it('overrides onConnection defaults', () => {
    const handlerEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlerEngine,
    })

    const onConnectionGuardian = jest.fn()
    const onConnectionHandler = jest.fn()
    const incomingAdapter = jest.fn()

    const route = engine.mount({
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

    const handlerEngine = WsHandlersEngine()

    const engine = WsRouteConnectionEngine({
      handlerEngine,
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

    const route = engine.mount({
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
    const handlerEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlerEngine,
    })

    const handler = jest.fn()

    const route = engine.mount({
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

  it('does not share state between mounts', () => {
    const handlerEngine = WsHandlersEngine()
    const engine = WsRouteConnectionEngine({
      handlerEngine,
    })

    const a = engine.mount({
      tag: WsRouteConnectionURI,
      path: '/a',
      handlers: [],
    })

    const b = engine.mount({
      tag: WsRouteConnectionURI,
      path: '/b',
      handlers: [],
    })

    expect(a).not.toBe(b)
  })
})
