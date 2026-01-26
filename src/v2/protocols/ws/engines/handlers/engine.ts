/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ApplicationServiceEngine,
  WithGlobalEnvGetter,
} from '../../../../core/application.service'
import type {
  Compilation,
  Engine,
  EngineBinder,
  ExtendedResult,
  RequiredTaggable,
} from '../../../../core/contracts'
import { UID } from '../../../../shared/uid'
import type { WsCommandHandler, WsCommandHandlerConfig } from '../../command'
import type { WsEventHandler, WsEventHandlerConfig } from '../../event'
import type {
  EmitterIncomingWsOut,
  WsMixedEventHandler,
  WsMixedEventHandlerConfig,
} from '../../mixed.event'
import type { Audience, WsIncomingMessage } from '../../ports'
import {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsMixedEventHandlerURI,
  WsURI,
} from '../../uri'
import type { WsHandlersJob } from './jobs'
import { resolveWsHandlersDefaults, WsHandlersDefaults } from './defaults'
import {
  compileWsHandlers,
  declareWsHandlers,
  jobsWsHandlers,
  runWsHandlers,
} from './methods'
import { WithWsRegistry } from '../../composition'

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

export type WsHandlersEngineBinder = EngineBinder<WsHandlersEngine, WsURI>

export interface WsHandlersEngineOptions
  extends WithGlobalEnvGetter, WithWsRegistry {
  defaults?: Partial<WsHandlersDefaults>
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

export function WsHandlersEngine({
  globalEnv,
  defaults,
  serviceEngine,
  uid,
  registry,
}: WsHandlersEngineOptions): WsHandlersEngine {
  return {
    declare: declareWsHandlers({
      defaults: resolveWsHandlersDefaults(defaults),
      serviceEngine,
    }),

    compile: compileWsHandlers({
      globalEnv,
      serviceEngine,
      uid,
      registry,
    }),

    jobs: jobsWsHandlers({ registry }),

    run: runWsHandlers({ registry }),
  }
}
