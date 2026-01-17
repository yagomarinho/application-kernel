/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Engine } from '../contracts'

import { CommandHandler } from './command.handler'
import { CommandHandlerConfig } from './command.handler.config'
import { EventHandler } from './event.handler'
import { EventHandlerConfig } from './event.handler.config'

export type Config = CommandHandlerConfig | EventHandlerConfig
export type Type = CommandHandler | EventHandler

type TypeMapper<C extends Config> = C extends CommandHandlerConfig
  ? CommandHandler
  : EventHandler

export interface MessagingEngine extends Engine<Config, Type> {
  mount: <C extends Config>(config: C) => TypeMapper<C>
}
