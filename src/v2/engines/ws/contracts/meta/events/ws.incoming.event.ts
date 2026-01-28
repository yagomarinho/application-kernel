import { WithWsIncomingAdapter } from '../../capabilities'

export interface WsIncomingEvent extends WithWsIncomingAdapter {
  source: 'ws'
  event: string
}
