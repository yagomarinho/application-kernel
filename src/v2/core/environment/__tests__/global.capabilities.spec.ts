import { Execution } from '../../contracts'
import { createEnvironment } from '../environment'
import {
  compilationKey,
  globalCapabilities,
  jobsKey,
} from '../global.capabilities'

describe('globalCapabilities', () => {
  const createJob = (overrides = {}) => ({
    id: 'job-1',
    tag: 'default',
    ...overrides,
  })

  const createExecution = (): Execution => ({ id: 'exec-1' }) as any

  it('registers a compilation for a job', () => {
    const env = createEnvironment()
    const registry = globalCapabilities(env)

    const job = createJob()
    const execution = createExecution()

    registry.compilation.attach({ job, execution })

    const map = env.get(compilationKey)

    expect(map).toBeInstanceOf(Map)
    expect(map?.get(job.id)).toEqual({ job, execution })
  })

  it('returns empty list when no jobs are registered', () => {
    const env = createEnvironment()
    const registry = globalCapabilities(env)

    expect(registry.jobs.list()).toEqual([])
  })

  it('lists all jobs across all tags', () => {
    const env = createEnvironment(
      new Map([
        [
          jobsKey.id,
          new Map([
            ['a', [{ id: '1', tag: 'a' }]],
            ['b', [{ id: '2', tag: 'b' }]],
          ]),
        ],
      ]),
    )

    const registry = globalCapabilities(env)

    expect(registry.jobs.list()).toEqual([
      { id: '1', tag: 'a' },
      { id: '2', tag: 'b' },
    ])
  })

  it('lists jobs filtered by tag', () => {
    const env = createEnvironment(
      new Map([
        [
          jobsKey.id,
          new Map([
            ['a', [{ id: '1', tag: 'a' }]],
            ['b', [{ id: '2', tag: 'b' }]],
          ]),
        ],
      ]),
    )

    const registry = globalCapabilities(env)

    expect(registry.jobs.list('a')).toEqual([{ id: '1', tag: 'a' }])
    expect(registry.jobs.list('c')).toEqual([])
  })

  it('resolves a job to its execution', () => {
    const env = createEnvironment()
    const registry = globalCapabilities(env)

    const job = createJob()
    const execution = createExecution()

    registry.compilation.attach({ job, execution })

    expect(registry.jobs.resolve(job)).toBe(execution)
  })

  it('throws if no compilation exists for job', () => {
    const env = createEnvironment()
    const registry = globalCapabilities(env)

    const job = createJob()

    expect(() => registry.jobs.resolve(job)).toThrow(
      `No compilation found for job ${job.id}`,
    )
  })

  it('throws if job tag mismatches compilation tag', () => {
    const env = createEnvironment()
    const registry = globalCapabilities(env)

    const job = createJob({ tag: 'a' })
    const execution = createExecution()

    registry.compilation.attach({
      job: { ...job, tag: 'b' },
      execution,
    })

    expect(() => registry.jobs.resolve(job)).toThrow(
      `Job tag mismatch: expected b, got a`,
    )
  })
})
