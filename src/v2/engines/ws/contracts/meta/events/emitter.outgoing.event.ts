import { Messaging } from '../../../../messaging'

export interface EmitterOutgoingEvent extends Messaging.Emits<string> {
  target: 'emitter'
}
