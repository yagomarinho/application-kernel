import type { UID } from '../../../../shared'

import { compileMessagingHandler } from '../compile'
import { Successful, Failure } from '@yagomarinho/domain-kernel'
import { CommandhandlerURI, EventHandlerURI, MessagingURI } from '../../uri'

describe('compileMessagingHandler', () => {
  it('compiles a CommandHandler into a command job with execution', async () => {
    const uid = {
      generate: () => 'cmd-1',
    } as UID

    const innerExecution = {
      execute: ({ data }: any) => Successful(data),
    }

    const serviceEngine = {
      compile: () => [{ execution: innerExecution }],
    } as any

    const declaration = {
      tag: CommandhandlerURI,
      on: 'user.create',
      emits: ['user.created'],
    } as any

    const compile = compileMessagingHandler({ serviceEngine, uid })

    const [compilation] = compile(declaration)

    // job
    expect(compilation.job).toEqual({
      id: 'cmd-1',
      on: 'user.create',
      emits: ['user.created'],
      tag: MessagingURI,
      type: CommandhandlerURI,
    })

    // execution propagates result for command
    const result = await compilation.execution.execute({
      data: 123,
      context: {} as any,
    })

    expect(result).toEqual(Successful(123))
  })

  it('compiles an EventHandler into an event job and ignores successful results', async () => {
    const uid = {
      generate: () => 'evt-1',
    } as UID

    const innerExecution = {
      execute: () => Successful(undefined),
    }

    const serviceEngine = {
      compile: () => [{ execution: innerExecution }],
    } as any

    const declaration = {
      tag: EventHandlerURI,
      on: 'user.created',
    } as any

    const compile = compileMessagingHandler({ serviceEngine, uid })

    const [compilation] = compile(declaration)

    // job
    expect(compilation.job).toEqual({
      id: 'evt-1',
      on: 'user.created',
      tag: MessagingURI,
      type: EventHandlerURI,
    })

    // successful result is ignored
    const result = await compilation.execution.execute({
      data: null,
      context: {} as any,
    })

    expect(result).toBeUndefined()
  })

  it('throws on failure when executing an EventHandler', async () => {
    const uid = {
      generate: () => 'evt-2',
    } as UID

    const innerExecution = {
      execute: () => Failure('boom'),
    }

    const serviceEngine = {
      compile: () => [{ execution: innerExecution }],
    } as any

    const declaration = {
      tag: EventHandlerURI,
      on: 'user.deleted',
    } as any

    const compile = compileMessagingHandler({ serviceEngine, uid })

    const [compilation] = compile(declaration)

    expect(() =>
      compilation.execution.execute({
        data: null,
        context: {} as any,
      }),
    ).toThrow('boom')
  })
})
