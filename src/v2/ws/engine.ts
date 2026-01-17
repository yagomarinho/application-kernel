/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Engine } from '../contracts'
import { WsCommandHandler } from './command/ws.command.handler'
import { WsCommandHandlerConfig } from './command/ws.command.handler.config'
import { WsEventHandler, WsEventHandlerConfig } from './event'

export type Config = WsCommandHandlerConfig | WsEventHandlerConfig
export type Type = WsCommandHandler | WsEventHandler

type TypeMapper<C extends Config> = C extends WsCommandHandlerConfig
  ? WsCommandHandler
  : WsEventHandler

export interface WsEngine extends Engine<Config, Type> {
  mount: <C extends Config>(config: C) => TypeMapper<C>
}
