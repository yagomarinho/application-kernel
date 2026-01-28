import { ApplicationService } from '../../../../application.service'
import { WithWsIncomingAdapter } from '../../capabilities'

export interface WsHandlersDefaults
  extends ApplicationService.ServiceDefaults, WithWsIncomingAdapter {}
