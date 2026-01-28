import { doneDefault, identity } from '../../application.service'
import {
  WsHandlersEngine,
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsMixedInOutURI,
} from '..'

describe('WsHandlersEngine', () => {
  it('declares a WsCommandHandler with defaults', () => {
    const engine = WsHandlersEngine()
    const handler = jest.fn()
    const emits = 'event'

    const command = engine.declare({
      tag: WsCommandHandlerURI,
      on: 'user.join',
      emits,
      handler,
    })

    expect(command.tag).toBe(WsCommandHandlerURI)
    expect(command.on).toBe('user.join')
    expect(command.emits).toBe(emits)
    expect(command.handler).toBe(handler)
    expect(command.incomingAdapter).toBe(identity)
    expect(command.env).toBe(identity)
    expect(command.middlewares).toEqual([])
    expect(command.postprocessors).toEqual([])
    expect(command.guardian).toBe(doneDefault)
    expect(command.onError).toBe(identity)
  })

  it('declares a WsEventHandler with defaults', () => {
    const engine = WsHandlersEngine()
    const handler = jest.fn()

    const event = engine.declare({
      tag: WsEventHandlerURI,
      on: 'room.joined',
      handler,
    })

    expect(event.tag).toBe(WsEventHandlerURI)
    expect(event.on).toBe('room.joined')
    expect(event.handler).toBe(handler)
    expect(event.incomingAdapter).toBe(identity)
    expect(event.env).toBe(identity)
    expect(event.middlewares).toEqual([])
    expect(event.postprocessors).toEqual([])
    expect(event.guardian).toBe(doneDefault)
    expect(event.onError).toBe(identity)
  })

  it('declares a WsMixedEventHandler with ws source and resolves incomingAdapter', () => {
    const engine = WsHandlersEngine()
    const handler = jest.fn()

    const mixed = engine.declare({
      tag: WsMixedInOutURI,
      on: {
        source: 'ws',
        event: 'message',
      },
      emits: {
        target: 'ws',
        event: 'event',
      },
      handler,
    })

    expect(mixed.tag).toBe(WsMixedInOutURI)
    expect(mixed.on).toEqual({
      source: 'ws',
      event: 'message',
      incomingAdapter: identity,
    })
    expect(mixed.emits).toEqual({
      target: 'ws',
      event: 'event',
    })
    expect(mixed.handler).toBe(handler)
    expect(mixed.env).toBe(identity)
    expect(mixed.middlewares).toEqual([])
    expect(mixed.postprocessors).toEqual([])
    expect(mixed.guardian).toBe(doneDefault)
    expect(mixed.onError).toBe(identity)
  })

  it('overrides incomingAdapter when provided', () => {
    const incomingAdapter = jest.fn()
    const handler = jest.fn()

    const engine = WsHandlersEngine()

    const command = engine.declare({
      tag: WsCommandHandlerURI,
      on: 'override.adapter',
      emits: 'event',
      handler,
      incomingAdapter,
    })

    expect(command.incomingAdapter).toBe(incomingAdapter)
  })

  it('overrides application service defaults', () => {
    const env = jest.fn()
    const guardian = jest.fn()
    const onError = jest.fn()
    const middlewares = []
    const postprocessors = []

    const engine = WsHandlersEngine({
      defaults: {
        env,
        guardian,
        onError,
        middlewares,
        postprocessors,
      },
    })

    const event = engine.declare({
      tag: WsEventHandlerURI,
      on: 'custom.defaults',
      handler: jest.fn(),
    })

    expect(event.env).toBe(env)
    expect(event.guardian).toBe(guardian)
    expect(event.middlewares).toBe(middlewares)
    expect(event.postprocessors).toBe(postprocessors)
    expect(event.onError).toBe(onError)
  })

  it('does not share state between declares', () => {
    const engine = WsHandlersEngine()

    const a = engine.declare({
      tag: WsEventHandlerURI,
      on: 'a',
      handler: jest.fn(),
    })

    const b = engine.declare({
      tag: WsEventHandlerURI,
      on: 'b',
      handler: jest.fn(),
    })

    expect(a).not.toBe(b)
  })
})
