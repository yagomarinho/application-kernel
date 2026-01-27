import { HttpRoute } from '../../contracts'
import { resolveHttpPipeline } from '../resolve.http.pipeline'

describe('resolveHttpPipeline', () => {
  it('resolves an http execution pipeline applying request and response adapters', async () => {
    const executionExecute = jest.fn(({ data }) => ({
      ok: true,
      value: data,
    }))

    const serviceEngine = {
      compile: () => [
        {
          execution: {
            execute: executionExecute,
          },
        },
      ],
    } as any

    const declaration = {
      adapters: {
        requestAdapter: (input: any) => ({
          adapted: input,
        }),
        responseAdapter: (output: any) => ({
          wrapped: output,
        }),
      },
      env: (() => ({})) as any,
      guardian: (() => null) as any,
      handler: (() => null) as any,
      middlewares: [],
      postprocessors: [],
      onError: (() => null) as any,
    } as any as HttpRoute

    const execute = resolveHttpPipeline({
      serviceEngine,
      declaration,
    })

    const result = await execute({
      data: { raw: true } as any,
      context: {} as any,
    })

    expect(executionExecute).toHaveBeenCalledWith({
      data: { adapted: { raw: true } },
      context: {},
    })

    expect(result).toEqual({
      wrapped: {
        ok: true,
        value: { adapted: { raw: true } },
      },
    })
  })
})
