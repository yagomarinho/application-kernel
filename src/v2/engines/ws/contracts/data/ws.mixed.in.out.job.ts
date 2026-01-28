/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
