import { Result } from '@yagomarinho/domain-kernel'
import { declareMessagingHandler } from '../declare'
import { CommandhandlerURI, EventHandlerURI } from '../../uri'

describe('declareMessagingHandler', () => {
  const defaults = {
    env: (e: any) => e,
    middlewares: [],
    guardian: (i: any) => i,
    postprocessors: [],
    onError: (e: any) => e,
  }

  const serviceEngine = {
    declare: (config: any) => ({
      env: config.env,
      middlewares: config.middlewares ?? [],
      guardian: config.guardian,
      handler: config.handler,
      postprocessors: config.postprocessors ?? [],
      onError: config.onError,
    }),
  } as any

  it('declares a CommandHandler and normalizes emits from string', () => {
    const declare = declareMessagingHandler({
      serviceEngine,
      defaults,
    })

    const handler = declare({
      tag: CommandhandlerURI,
      on: 'user.create',
      emits: 'user.created',
      handler: () => Result.ok('ok'),
    })

    expect(handler.tag).toBe(CommandhandlerURI)
    expect(handler.on).toBe('user.create')
    expect(handler.emits).toEqual({
      onSuccess: 'user.created',
      onError: 'user.created',
    })

    // service contract preserved
    expect(handler).toHaveProperty('handler')
    expect(handler).toHaveProperty('env')
    expect(handler).toHaveProperty('guardian')
  })

  it('declares a CommandHandler and preserves emits object', () => {
    const declare = declareMessagingHandler({
      serviceEngine,
      defaults,
    })

    const handler = declare({
      tag: CommandhandlerURI,
      on: 'order.pay',
      emits: {
        onSuccess: 'order.paid',
        onError: 'order.payment_failed',
      },
      handler: () => Result.ok('ok'),
    })

    expect(handler.emits).toEqual({
      onSuccess: 'order.paid',
      onError: 'order.payment_failed',
    })
  })

  it('declares an EventHandler without emits', () => {
    const declare = declareMessagingHandler({
      serviceEngine,
      defaults,
    })

    const handler = declare({
      tag: EventHandlerURI,
      on: 'user.created',
      handler: () => Result.ok(),
    })

    expect(handler.tag).toBe(EventHandlerURI)
    expect(handler.on).toBe('user.created')
    expect('emits' in handler).toBe(false)

    // service contract preserved
    expect(handler).toHaveProperty('handler')
    expect(handler).toHaveProperty('env')
    expect(handler).toHaveProperty('guardian')
  })
})
