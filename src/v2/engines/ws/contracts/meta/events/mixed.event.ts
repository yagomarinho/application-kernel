import type { EmitterIncomingEvent } from './emitter.incoming.event'
import type { EmitterOutgoingEvent } from './emitter.outgoing.event'
import type { WsIncomingEvent } from './ws.incoming.event'
import type { WsOutgoingEvent } from './ws.outgoing.event'

export type MixedOutgoingEvent = WsOutgoingEvent | EmitterOutgoingEvent

export type MixedIncomingEvent = WsIncomingEvent | EmitterIncomingEvent
