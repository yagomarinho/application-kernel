/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Engine, EngineBinder, RequiredTaggable } from '../../contracts'

import { CommandHandler } from '../command/command.handler'
import { CommandHandlerConfig } from '../command/command.handler.config'
import { EventHandler } from '../event/event.handler'
import { EventHandlerConfig } from '../event/event.handler.config'
import { MessagingURI } from '../uri'
import { castMessagingDefaults, MessagingDefaults } from './messaging.defaults'
import { mountMessagingHandler } from './mount'

export type MessagingHandlerConfig = CommandHandlerConfig | EventHandlerConfig

export type MessagingHandler = CommandHandler | EventHandler

export type MessagingHandlerMapper<C extends MessagingHandlerConfig> =
  C extends CommandHandlerConfig ? CommandHandler : EventHandler

export interface MessagingEngine extends Engine<
  MessagingHandlerConfig,
  MessagingHandler
> {
  mount: <C extends MessagingHandlerConfig>(
    config: RequiredTaggable<C>,
  ) => MessagingHandlerMapper<C>
}

export type MessagingEngineBinder = EngineBinder<MessagingEngine, MessagingURI>

export interface MessagingEngineOptions {
  defaults?: Partial<MessagingDefaults>
}

export function MessagingEngine({
  defaults,
}: MessagingEngineOptions = {}): MessagingEngine {
  const ensureDefaults = castMessagingDefaults(defaults)

  const mount: MessagingEngine['mount'] = mountMessagingHandler(ensureDefaults)

  return {
    mount,
  }
}
