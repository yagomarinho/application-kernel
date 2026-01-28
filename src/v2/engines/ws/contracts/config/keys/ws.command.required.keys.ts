import type { ApplicationService } from '../../../../application.service'
import type { Messaging } from '../../../../messaging'

export type ExclusiveWsCommandRequiredKeys =
  Messaging.ExclusiveCommandRequiredKeys

export type WsCommandRequiredKeys =
  | ExclusiveWsCommandRequiredKeys
  | ApplicationService.ServiceRequiredKeys
