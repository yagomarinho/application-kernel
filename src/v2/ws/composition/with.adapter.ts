import { WsIncomingContext } from '../ws.incoming.context'

export interface WithAdapter<RawInput = unknown> {
  incomingAdapter: (incoming: WsIncomingContext) => RawInput
}
