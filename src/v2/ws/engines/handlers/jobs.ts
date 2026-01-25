/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Job } from '../../../contracts'
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
  WsMixedEventHandlerURI,
  WsURI,
} from '../../uri'

export interface WsEventHandlerJob extends Job<WsURI>, AcceptIncoming {
  type: WsEventHandlerURI
}

export interface WsCommandHandlerJob
  extends Job<WsURI>, AcceptIncoming, EndsEmits {
  type: WsCommandHandlerURI
}

export interface WsIncomingEmitterOutJob extends Job<WsURI> {
  on: AcceptWsIncoming
  emits: EmitsEmitterOutput
  type: WsMixedEventHandlerURI
}

export interface EmitterIncomingWsOutJob extends Job<WsURI> {
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
