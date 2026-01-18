/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Engine, EngineBinder, RequiredTaggable } from '../contracts'

import { CommandHandler } from './command/command.handler'
import { CommandHandlerConfig } from './command/command.handler.config'
import { EventHandler } from './event/event.handler'
import { EventHandlerConfig } from './event/event.handler.config'
import { MessagingHandlerURI } from './uri'

type Config = CommandHandlerConfig | EventHandlerConfig
type Type = CommandHandler | EventHandler

type TypeMapper<C extends Config> = C extends CommandHandlerConfig
  ? CommandHandler
  : EventHandler

export interface MessagingEngine extends Engine<Config, Type> {
  mount: <C extends Config>(config: RequiredTaggable<C>) => TypeMapper<C>
}

export type MessageEngineBinder = EngineBinder<
  MessagingEngine,
  MessagingHandlerURI
>
