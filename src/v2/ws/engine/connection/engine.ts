/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Engine, EngineBinder } from '../../../contracts'

import {
  WsRouteConnection,
  WsRouteConnectionConfig,
} from '../../route.connection'
import type { WsURI } from '../../uri'
import { WsHandlersEngine } from '../handlers'
import {
  resolveWsRouteConnectionDefaults,
  WsRouteConnectionDefaults,
} from './defaults'
import { mountWsRouteConnection } from './mount'

export interface WsRouteConnectionEngine extends Engine<
  WsRouteConnectionConfig,
  WsRouteConnection
> {}

export type WsRouteConnectionEngineBinder = EngineBinder<
  WsRouteConnectionEngine,
  WsURI
>

export interface WsRouteConnectionEngineOptions {
  defaults?: Partial<WsRouteConnectionDefaults>
  handlerEngine: WsHandlersEngine
}

export function WsRouteConnectionEngine({
  defaults,
  handlerEngine,
}: WsRouteConnectionEngineOptions): WsRouteConnectionEngine {
  const ensureDefaults = resolveWsRouteConnectionDefaults(defaults)

  const mount: WsRouteConnectionEngine['mount'] = mountWsRouteConnection(
    ensureDefaults,
    handlerEngine,
  )

  return {
    mount,
  }
}
