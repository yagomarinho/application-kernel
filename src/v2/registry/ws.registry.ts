import type { Job } from '../contracts'
import type { Audience } from '../ws'
import type { State } from './state'

export interface WsRegistry {
  readonly state: State

  audiences: {
    register(job: Job, audience: Audience): void
    resolve(job: Job): Audience[]
  }
}
