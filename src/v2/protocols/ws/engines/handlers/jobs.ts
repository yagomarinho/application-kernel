/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Job } from '../../../../core/contracts'
import { AcceptIncoming, EndsEmits } from '../../../messaging'
import {
  AcceptEmitterIncoming,
  AcceptWsIncoming,
  EmitsEmitterOutput,
  EmitsWsOutput,
} from '../../composition'
import {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsHandlersURI,
  WsMixedEventHandlerURI,
} from '../../uri'

export interface WsEventHandlerJob extends Job<WsHandlersURI>, AcceptIncoming {
  type: WsEventHandlerURI
}

export interface WsCommandHandlerJob
  extends Job<WsHandlersURI>, AcceptIncoming, EndsEmits {
  type: WsCommandHandlerURI
}

export interface WsIncomingEmitterOutJob extends Job<WsHandlersURI> {
  on: AcceptWsIncoming
  emits: EmitsEmitterOutput
  type: WsMixedEventHandlerURI
}

export interface EmitterIncomingWsOutJob extends Job<WsHandlersURI> {
  on: AcceptEmitterIncoming
  emits: EmitsWsOutput
  type: WsMixedEventHandlerURI
}

export type WsMixedEventHandlerJob =
  | WsIncomingEmitterOutJob
  | EmitterIncomingWsOutJob

export type WsHandlersJob =
  | WsEventHandlerJob
  | WsCommandHandlerJob
  | WsMixedEventHandlerJob
