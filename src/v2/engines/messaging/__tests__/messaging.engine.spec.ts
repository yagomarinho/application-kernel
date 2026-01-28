import type { UID } from '../../../shared'

import { Successful, Result } from '@yagomarinho/domain-kernel'
import { createMessagingEngine } from '../create.messaging.engine'
import { createAmbient, createRuntimeView } from '../../../core'
import { CommandhandlerURI, EventHandlerURI, MessagingURI } from '../uri'
import { createServiceEngine } from '../../application.service'

describe('createMessagingEngine', () => {
  function createView() {
    const ambient = createAmbient()
    const runtime = createRuntimeView(ambient)

    return runtime
  }

  it('declares, compiles and runs a CommandHandler successfully', async () => {
    const view = createView()

    const uid = {
      generate: () => 'cmd-1',
    } as UID

    const serviceEngine = createServiceEngine({ view })

    const engine = createMessagingEngine({
      serviceEngine,
      view,
      uid,
    })

    const handler = engine.declare({
      tag: CommandhandlerURI,
      on: 'math.increment',
      emits: 'math.incremented',
      handler: (data: number) => Result.ok(data + 1),
    })

    const [compilation] = engine.compile(handler)
    view.compilation.attach(compilation)

    const jobs = engine.jobs()
    expect(jobs).toHaveLength(1)
    expect(jobs[0]).toEqual({
      id: 'cmd-1',
      on: 'math.increment',
      emits: {
        onSuccess: 'math.incremented',
        onError: 'math.incremented',
      },
      tag: MessagingURI,
      type: CommandhandlerURI,
    })

    const result = await engine.run(jobs[0], {
      data: 1,
      context: {},
    })

    expect(result).toEqual(expect.objectContaining(Successful(2)))
  })

  it('runs an EventHandler and ignores successful results', async () => {
    const view = createView()

    const uid = {
      generate: () => 'evt-1',
    } as UID

    const serviceEngine = createServiceEngine({ view })
    const engine = createMessagingEngine({
      defaults: {},
      serviceEngine,
      view,
      uid,
    })

    const handler = engine.declare({
      tag: EventHandlerURI,
      on: 'user.created',
      handler: () => Result.ok(null),
    })

    const [compilation] = engine.compile(handler)
    view.compilation.attach(compilation)

    const job = engine.jobs()[0]

    const result = await engine.run(job, {
      data: null,
      context: {} as any,
    })

    expect(result).toBeUndefined()
  })

  it('throws when an EventHandler execution fails', async () => {
    const view = createView()

    const uid = {
      generate: () => 'evt-2',
    } as UID

    const serviceEngine = createServiceEngine({ view })

    const engine = createMessagingEngine({
      defaults: {},
      serviceEngine,
      view,
      uid,
    })

    const handler = engine.declare({
      tag: EventHandlerURI,
      on: 'user.deleted',
      guardian: () => {
        throw new Error('boom')
      },
      handler: () => Result.ok(null),
    })

    const [compilation] = engine.compile(handler)
    view.compilation.attach(compilation)

    const job = engine.jobs()[0]

    expect(() =>
      engine.run(job, {
        data: null,
        context: {} as any,
      }),
    ).toThrow('boom')
  })
})
