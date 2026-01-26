/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pipe } from '@yagomarinho/smooth'
import { ApplicationServiceEngine } from '../../../../core/application.service'
import type {
  Compilation,
  Engine,
  EngineBinder,
} from '../../../../core/contracts'
import { Registry } from '../../../../core/environment'
import { UID } from '../../../../shared/uid'

import {
  WsRouteConnection,
  WsRouteConnectionConfig,
} from '../../route.connection'
import type { WsURI } from '../../uri'
import { WsHandlersEngine } from '../handlers'
import { WsJobs } from '../jobs'
import {
  resolveWsRouteConnectionDefaults,
  WsRouteConnectionDefaultsToResolve,
} from './defaults'
import { declareWsRouteConnection } from './methods'
import {
  WithGlobalEnvGetter,
  WithRegistry,
} from '../../../../core/application.service/composition'

export interface WsRouteConnectionEngine extends Engine<
  WsRouteConnectionConfig,
  WsRouteConnection,
  WsJobs
> {}

export type WsRouteConnectionEngineBinder = EngineBinder<
  WsRouteConnectionEngine,
  WsURI
>

export interface WsRouteConnectionEngineOptions
  extends WithGlobalEnvGetter, WithRegistry {
  defaults?: WsRouteConnectionDefaultsToResolve
  handlersEngine: WsHandlersEngine
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

export function WsRouteConnectionEngine({
  defaults,
  handlersEngine,
  serviceEngine,
  registry,
  uid,
  globalEnv,
}: WsRouteConnectionEngineOptions): WsRouteConnectionEngine {
  const ensureDefaults = resolveWsRouteConnectionDefaults(defaults)

  const declare: WsRouteConnectionEngine['declare'] = declareWsRouteConnection(
    ensureDefaults,
    handlersEngine,
  )

  const compile: WsRouteConnectionEngine['compile'] = ({
    env,
    handlers,
    incomingAdapter,
    middlewares,
    onConnection,
    onError,
    path,
    postprocessors,
    tag,
  }: WsRouteConnection): Compilation<WsJobs>[] => {
    const [{ execution }] = serviceEngine.compile({
      env: pipe(env, onConnection.env),
      guardian: onConnection.guardian,
      handler: onConnection.handler,
      middlewares: middlewares.concat(onConnection.middlewares),
      onError: (err, e, ctx) =>
        onError(onConnection.onError(err, e, ctx), env(globalEnv()), ctx),
      postprocessors: postprocessors.concat(onConnection.postprocessors),
    })
  }

  const jobs: WsRouteConnectionEngine['jobs'] = declareWsRouteConnection(
    ensureDefaults,
    handlersEngine,
  )

  const run: WsRouteConnectionEngine['run'] = declareWsRouteConnection(
    ensureDefaults,
    handlersEngine,
  )

  return {
    declare,
    compile,
    jobs,
    run,
  }
}
