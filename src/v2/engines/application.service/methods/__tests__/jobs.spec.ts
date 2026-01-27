import type { WithApplicationView } from '../../../../core'
import { jobsApplicationService } from '../jobs'

describe('jobs application service', () => {
  it('returns a function that delegates to view.jobs.list', () => {
    const calls: any[] = []

    const view: WithApplicationView['view'] = {
      jobs: {
        list: (tag?: string) => {
          calls.push(tag)
          return `jobs:${tag ?? 'all'}`
        },
      },
    } as any

    const service = jobsApplicationService({ view })

    const result = service('backend')

    expect(result).toBe('jobs:backend')
    expect(calls).toEqual(['backend'])
  })

  it('forwards undefined when no tag is provided', () => {
    const calls: any[] = []

    const view: WithApplicationView['view'] = {
      jobs: {
        list: (tag?: string) => {
          calls.push(tag)
          return 'jobs:all'
        },
      },
    } as any

    const service = jobsApplicationService({ view })

    const result = service()

    expect(result).toBe('jobs:all')
    expect(calls).toEqual([undefined])
  })

  it('does not add any extra behavior beyond delegation', () => {
    const view: WithApplicationView['view'] = {
      jobs: {
        list: (tag?: string) => ({ tag }),
      },
    } as any

    const service = jobsApplicationService({ view })

    const output = service('frontend')

    expect(output).toEqual({ tag: 'frontend' })
  })
})
