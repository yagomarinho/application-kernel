import { WithIncomingAdapter } from '../../capabilities'

export interface WsIncomingEvent extends WithIncomingAdapter {
  source: 'ws'
  event: string
}
