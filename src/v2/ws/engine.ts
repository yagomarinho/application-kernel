/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Engine, EngineBinder, RequiredTaggable } from '../contracts'
import type { WsCommandHandler, WsCommandHandlerConfig } from './command'
import type { WsEventHandler, WsEventHandlerConfig } from './event'
import type {
  WsMixedEventHandler,
  WsMixedEventHandlerConfig,
} from './mixed.event'
import type { WshandlerURI } from './uri'

type Config =
  | WsCommandHandlerConfig
  | WsEventHandlerConfig
  | WsMixedEventHandlerConfig
type Type = WsCommandHandler | WsEventHandler | WsMixedEventHandler

type TypeMapper<C extends Config> = C extends WsCommandHandlerConfig
  ? WsCommandHandler
  : WsEventHandler

export interface WsEngine extends Engine<Config, Type> {
  mount: <C extends Config>(config: RequiredTaggable<C>) => TypeMapper<C>
}

export type WsEngineBinder = EngineBinder<WsEngine, WshandlerURI>
