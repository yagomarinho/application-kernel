/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Engine, EngineBinder } from '../../contracts'

import { WsRouteConnection, WsRouteConnectionConfig } from '../route.connection'
import type { WsURI } from '../uri'

export interface WsConnectionEngine extends Engine<
  WsRouteConnectionConfig,
  WsRouteConnection
> {}

export type WsConnectionEngineBinder = EngineBinder<WsConnectionEngine, WsURI>
