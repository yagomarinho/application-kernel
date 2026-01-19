/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IncomingAdapter, OnConnection } from '../composition'
import { WsHandlersEngineBinder } from '../engine'
import type { WsRouteConnection } from './ws.route.connection'

type RequiredKeys = 'path' | 'handlers'

type Config = Omit<WsRouteConnection, 'handlers' | 'onConnection'> & {
  onConnection: Omit<OnConnection, 'incomingAdapter'> & {
    incomingAdapter?: IncomingAdapter
  }
  handlers: WsHandlersEngineBinder[]
}

export type WsRouteConnectionConfig = Partial<Omit<Config, RequiredKeys>> &
  Pick<Config, RequiredKeys>
