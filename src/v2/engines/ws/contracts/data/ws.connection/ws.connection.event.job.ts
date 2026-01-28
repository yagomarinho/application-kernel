import type { Job } from '../../../../../core'
import type { WsConnectionURI, WsURI } from '../../../uri'

export interface WsConnectionEventJob extends Job<WsURI> {
  origin: WsConnectionURI
  type: 'event'
}
