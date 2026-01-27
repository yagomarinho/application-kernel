import { resolveHttpCompilation } from '../resolve.http.compilation'
import { HttpURI } from '../../uri'

describe('resolve http compilation', () => {
  it('creates a HttpCompilation with generated job and preserved execution', () => {
    const generate = jest.fn(() => 'uid-123')

    const execution = {
      execute: () => null,
    } as any

    const compilation = resolveHttpCompilation({
      uid: { generate } as any,
      declaration: {
        method: 'get',
        path: '/health',
      },
      execution,
    })

    expect(generate).toHaveBeenCalledTimes(1)

    expect(compilation).toEqual({
      job: {
        id: 'uid-123',
        tag: HttpURI,
        path: '/health',
        method: 'get',
      },
      execution,
    })

    expect(compilation.execution).toBe(execution)
  })
})
