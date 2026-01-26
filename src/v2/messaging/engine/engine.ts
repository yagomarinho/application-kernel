/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationServiceEngine } from '../../application.service'
import {
  Engine,
  EngineBinder,
  ExtendedResult,
  RequiredTaggable,
} from '../../contracts'
import { UID } from '../../uid'

import { CommandHandler } from '../command/command.handler'
import { CommandHandlerConfig } from '../command/command.handler.config'
import { EventHandler } from '../event/event.handler'
import { EventHandlerConfig } from '../event/event.handler.config'
import { MessagingURI } from '../uri'
import { resolveMessagingDefaults, MessagingDefaults } from './defaults'
import { MessagingJob } from './job'
import {
  compileMessagingHandler,
  declareMessagingHandler,
  jobsMessagingHandler,
  runMessagingHandler,
} from './methods'
import { Registry } from '../../environment'

export type MessagingHandlerConfig = CommandHandlerConfig | EventHandlerConfig

export type MessagingHandler = CommandHandler | EventHandler

export type MessagingHandlerMapper<C extends MessagingHandlerConfig> =
  C extends CommandHandlerConfig ? CommandHandler : EventHandler

export interface MessagingEngine extends Engine<
  MessagingHandlerConfig,
  MessagingHandler,
  MessagingJob,
  any,
  ExtendedResult
> {
  declare: <C extends MessagingHandlerConfig>(
    config: RequiredTaggable<C>,
  ) => MessagingHandlerMapper<C>
}

export type MessagingEngineBinder = EngineBinder<MessagingEngine, MessagingURI>

export interface MessagingEngineOptions {
  defaults?: Partial<MessagingDefaults>
  serviceEngine: ApplicationServiceEngine
  uid: UID
  registry: Registry
}

export function MessagingEngine({
  defaults,
  serviceEngine,
  uid,
  registry,
}: MessagingEngineOptions): MessagingEngine {
  return {
    declare: declareMessagingHandler({
      defaults: resolveMessagingDefaults(defaults),
      serviceEngine,
    }),

    compile: compileMessagingHandler({
      serviceEngine,
      uid,
    }),

    jobs: jobsMessagingHandler({
      registry,
    }),

    run: runMessagingHandler({ registry }),
  }
}
