import { ServiceBase } from './service.base'

export interface Engine<C, S extends ServiceBase> {
  mount: (config: C) => S
}
