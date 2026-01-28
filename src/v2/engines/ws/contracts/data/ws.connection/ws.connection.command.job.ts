import type { Job } from '../../../../../core'
import type { Messaging } from '../../../../messaging'
import type { WsConnectionURI, WsURI } from '../../../uri'
import type { MixedOutgoingEvent } from '../../meta'

export interface WsConnectionCommandJob
  extends
    Job<WsURI>,
    Messaging.WithEmits<Messaging.Emits<string | MixedOutgoingEvent>> {
  origin: WsConnectionURI
  type: 'command'
}
