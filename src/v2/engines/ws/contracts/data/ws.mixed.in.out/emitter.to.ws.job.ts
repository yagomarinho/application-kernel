import type { Job } from '../../../../../core'
import type { Messaging } from '../../../../messaging'
import type { WsHandlersURI, WsMixedInOutURI } from '../../../uri'
import type { EmitterIncomingEvent, WsOutgoingEvent } from '../../meta'

export interface EmitterToWsJob
  extends
    Job<WsHandlersURI>,
    Messaging.WithOn<EmitterIncomingEvent>,
    Messaging.WithEmits<WsOutgoingEvent> {
  type: WsMixedInOutURI
}
