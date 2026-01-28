import { Successful, Failure } from '@yagomarinho/domain-kernel'

import { resolveMessagingExecution } from '../resolve.messaging.execution'
import { CommandhandlerURI } from '../../uri'

describe('resolveMessagingExecution', () => {
  it('returns result directly for CommandHandler', async () => {
    const execution = {
      execute: ({ data }: any) => Successful(data),
    }

    const serviceEngine = {
      compile: () => [{ execution }],
    } as any

    const handler = {
      tag: CommandhandlerURI,
    } as any

    const resolved = resolveMessagingExecution({
      declaration: handler,
      serviceEngine,
    })

    const result = await resolved.execute({
      data: 1,
      context: {} as any,
    })

    expect(result).toEqual(Successful(1))
  })

  it('does nothing on Successful result for EventHandler', async () => {
    const execution = {
      execute: () => Successful(undefined),
    }

    const serviceEngine = {
      compile: () => [{ execution }],
    } as any

    const handler = {
      tag: 'event',
    } as any

    const resolved = resolveMessagingExecution({
      declaration: handler,
      serviceEngine,
    })

    const result = await resolved.execute({
      data: null,
      context: {} as any,
    })

    expect(result).toBeUndefined()
  })

  it('throws error on Failure result for EventHandler', async () => {
    const execution = {
      execute: () => Failure('boom'),
    }

    const serviceEngine = {
      compile: () => [{ execution }],
    } as any

    const handler = {
      tag: 'event',
    } as any

    const resolved = resolveMessagingExecution({
      declaration: handler,
      serviceEngine,
    })

    await expect(
      resolved.execute({
        data: null,
        context: {} as any,
      }),
    ).rejects.toThrow('boom')
  })
})
