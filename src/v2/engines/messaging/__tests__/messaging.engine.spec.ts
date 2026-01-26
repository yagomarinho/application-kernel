import { doneDefault, identity } from '../../application.service'
import { MessagingEngine } from '../engine'
import { CommandhandlerURI, EventHandlerURI } from '../uri'

describe('MessagingEngine', () => {
  it('declares a CommandHandler with defaults', () => {
    const engine = MessagingEngine()
    const handler = jest.fn()
    const emits = 'event'

    const command = engine.declare({
      tag: CommandhandlerURI,
      on: 'user.create',
      emits,
      handler,
    })

    expect(command.tag).toBe(CommandhandlerURI)
    expect(command.on).toBe('user.create')
    expect(command.emits).toBe(emits)
    expect(command.handler).toBe(handler)
    expect(command.env).toBe(identity)
    expect(command.middlewares).toEqual([])
    expect(command.postprocessors).toEqual([])
    expect(command.guardian).toBe(doneDefault)
    expect(command.onError).toBe(identity)
  })

  it('declares an EventHandler with defaults', () => {
    const engine = MessagingEngine()
    const handler = jest.fn()

    const event = engine.declare({
      tag: EventHandlerURI,
      on: 'user.created',
      handler,
    })

    expect(event.tag).toBe(EventHandlerURI)
    expect(event.on).toBe('user.created')
    expect(event.handler).toBe(handler)
    expect(event.env).toBe(identity)
    expect(event.middlewares).toEqual([])
    expect(event.postprocessors).toEqual([])
    expect(event.guardian).toBe(doneDefault)
    expect(event.onError).toBe(identity)
  })

  it('overrides application service defaults', () => {
    const env = jest.fn()
    const guardian = jest.fn()
    const handler = jest.fn()
    const onError = jest.fn()
    const middlewares = []
    const postprocessors = []

    const engine = MessagingEngine({
      defaults: {
        env,
        guardian,
        middlewares,
        postprocessors,
        onError,
      },
    })

    const command = engine.declare({
      tag: CommandhandlerURI,
      on: 'order.create',
      emits: 'event',
      handler,
    })

    const event = engine.declare({
      tag: EventHandlerURI,
      on: 'order.create',
      handler,
    })

    expect(command.env).toBe(env)
    expect(command.guardian).toBe(guardian)
    expect(command.middlewares).toBe(middlewares)
    expect(command.postprocessors).toBe(postprocessors)
    expect(command.onError).toBe(onError)

    expect(event.env).toBe(env)
    expect(event.guardian).toBe(guardian)
    expect(event.middlewares).toBe(middlewares)
    expect(event.postprocessors).toBe(postprocessors)
    expect(event.onError).toBe(onError)
  })

  it('overrides on creating handler', () => {
    const env = jest.fn()
    const guardian = jest.fn()
    const handler = jest.fn()
    const onError = jest.fn()
    const middlewares = []
    const postprocessors = []

    const engine = MessagingEngine()

    const command = engine.declare({
      tag: CommandhandlerURI,
      on: 'order.create',
      emits: 'event',
      handler,
      env,
      guardian,
      middlewares,
      postprocessors,
      onError,
    })

    const event = engine.declare({
      tag: EventHandlerURI,
      on: 'order.create',
      handler,
      env,
      guardian,
      middlewares,
      postprocessors,
      onError,
    })

    expect(command.env).toBe(env)
    expect(command.guardian).toBe(guardian)
    expect(command.middlewares).toBe(middlewares)
    expect(command.postprocessors).toBe(postprocessors)
    expect(command.onError).toBe(onError)

    expect(event.env).toBe(env)
    expect(event.guardian).toBe(guardian)
    expect(event.middlewares).toBe(middlewares)
    expect(event.postprocessors).toBe(postprocessors)
    expect(event.onError).toBe(onError)
  })

  it('does not share state between declares', () => {
    const engine = MessagingEngine()

    const commandA = engine.declare({
      tag: CommandhandlerURI,
      on: 'a',
      emits: 'event',
      handler: jest.fn(),
    })

    const commandB = engine.declare({
      tag: CommandhandlerURI,
      on: 'b',
      emits: 'event',
      handler: jest.fn(),
    })

    expect(commandA).not.toBe(commandB)
  })
})
