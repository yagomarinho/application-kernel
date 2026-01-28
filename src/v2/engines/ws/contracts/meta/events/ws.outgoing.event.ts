import { Messaging } from '../../../../messaging'
import { AudienceResolver } from '../audience.resolver'

export interface WsOutgoingEvent extends Messaging.Emits<string> {
  target: 'ws'
  audience: AudienceResolver[]
}
