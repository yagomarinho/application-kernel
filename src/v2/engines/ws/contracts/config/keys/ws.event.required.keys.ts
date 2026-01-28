import type { ApplicationService } from '../../../../application.service'
import type { Messaging } from '../../../../messaging'

export type ExclusiveWsEventRequiredKeys = Messaging.ExclusiveEventRequiredKeys

export type WsEventRequiredKeys =
  | ExclusiveWsEventRequiredKeys
  | ApplicationService.ServiceRequiredKeys
