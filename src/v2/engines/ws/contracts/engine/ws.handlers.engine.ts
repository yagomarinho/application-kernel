/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type WsHandlersConfig =
  | WsCommandHandlerConfig
  | WsEventHandlerConfig
  | WsMixedEventHandlerConfig

export type WsHandlers = WsCommandHandler | WsEventHandler | WsMixedEventHandler

type Mapper = {
  [WsCommandHandlerURI]: WsCommandHandler
  [WsEventHandlerURI]: WsEventHandler
  [WsMixedEventHandlerURI]: WsMixedEventHandler
}

export type WsHandlersMapper<C extends WsHandlersConfig> = Mapper[NonNullable<
  C['tag']
>]

export type WsHandlersIncomingMapper<D extends WsHandlers> =
  D extends EmitterIncomingWsOut ? any : WsIncomingMessage

export type ResultWithAudience = ExtendedResult & { audience: Audience[] }

export type WsHandlersOutgoingMapper<D extends WsHandlers> =
  D extends EmitterIncomingWsOut ? ResultWithAudience : ExtendedResult

export interface WsHandlersEngine extends Engine<
  WsHandlersConfig,
  WsHandlers,
  WsHandlersJob
> {
  declare: <C extends WsHandlersConfig>(
    config: RequiredTaggable<C>,
  ) => WsHandlersMapper<C>

  compile: <D extends WsHandlers>(
    declaration: D,
  ) => Compilation<
    WsHandlersJob,
    WsHandlersIncomingMapper<D>,
    WsHandlersOutgoingMapper<D>
  >[]
}
