import { jobsMessagingHandler } from '../jobs'
import { CommandhandlerURI, EventHandlerURI, MessagingURI } from '../../uri'

describe('jobsMessagingHandler', () => {
  function createView() {
    const jobsByTag = new Map<string, any[]>()

    return {
      jobs: {
        list: (tag?: string) => {
          if (!tag) return [...jobsByTag.values()].flat()
          return jobsByTag.get(tag) ?? []
        },
      },
      // helper só para o teste
      __attach(job: any) {
        const list = jobsByTag.get(job.tag) ?? []
        jobsByTag.set(job.tag, list.concat(job))
      },
    } as any
  }

  it('returns command and event jobs together', () => {
    const view = createView()

    const commandJob = {
      id: 'c1',
      type: CommandhandlerURI,
      tag: 'messaging',
    }

    const eventJob = {
      id: 'e1',
      type: EventHandlerURI,
      tag: 'messaging',
    }

    const otherJob = {
      id: 'x1',
      type: 'other',
      tag: 'http',
    }

    view.__attach(commandJob)
    view.__attach(eventJob)
    view.__attach(otherJob)

    const jobs = jobsMessagingHandler({ view })()

    expect(jobs).toEqual([commandJob, eventJob])
  })

  it('returns empty array when no messaging jobs exist', () => {
    const view = createView()

    const jobs = jobsMessagingHandler({ view })()

    expect(jobs).toEqual([])
  })

  it('preserves order: command jobs first, then event jobs', () => {
    const view = createView()

    const commandJob1 = { id: 'c1', type: CommandhandlerURI, tag: MessagingURI }
    const commandJob2 = { id: 'c2', type: CommandhandlerURI, tag: MessagingURI }
    const eventJob = { id: 'e1', type: EventHandlerURI, tag: MessagingURI }

    view.__attach(commandJob1)
    view.__attach(eventJob)
    view.__attach(commandJob2)

    const jobs = jobsMessagingHandler({ view })()

    expect(jobs).toEqual([commandJob1, eventJob, commandJob2])
  })
})
