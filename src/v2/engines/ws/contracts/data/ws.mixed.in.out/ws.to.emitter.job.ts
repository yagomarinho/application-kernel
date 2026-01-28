import type { Job } from '../../../../../core'
import type { Messaging } from '../../../../messaging'
import type { WsHandlersURI, WsMixedInOutURI } from '../../../uri'
import type { EmitterOutgoingEvent, WsIncomingEvent } from '../../meta'

export interface WsToEmitterJob
  extends
    Job<WsHandlersURI>,
    Messaging.WithOn<WsIncomingEvent>,
    Messaging.WithEmits<EmitterOutgoingEvent> {
  type: WsMixedInOutURI
}
