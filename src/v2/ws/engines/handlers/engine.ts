/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Engine, EngineBinder, RequiredTaggable } from '../../../contracts'
import type { WsCommandHandler, WsCommandHandlerConfig } from '../../command'
import type { WsEventHandler, WsEventHandlerConfig } from '../../event'
import type {
  WsMixedEventHandler,
  WsMixedEventHandlerConfig,
} from '../../mixed.event'
import type {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsMixedEventHandlerURI,
  WsURI,
} from '../../uri'
import { resolveWsHandlersDefaults, WsHandlersDefaults } from './defaults'
import { declareWsHandlers } from './declare'

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

export interface WsHandlersEngine extends Engine<WsHandlersConfig, WsHandlers> {
  declare: <C extends WsHandlersConfig>(
    config: RequiredTaggable<C>,
  ) => WsHandlersMapper<C>
}

export type WsHandlersEngineBinder = EngineBinder<WsHandlersEngine, WsURI>

export interface WsHandlersEngineOptions {
  defaults?: Partial<WsHandlersDefaults>
}

export function WsHandlersEngine({
  defaults,
}: WsHandlersEngineOptions = {}): WsHandlersEngine {
  const ensureDefaults = resolveWsHandlersDefaults(defaults)

  const declare: WsHandlersEngine['declare'] = declareWsHandlers(ensureDefaults)

  return {
    declare,
  }
}
