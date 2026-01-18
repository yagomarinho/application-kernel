/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { WsRouteConnectionConfig } from './ws.route.connection.config'
import type {
  WsConnectionEngine,
  WsConnectionEngineBinder,
  WsHandlers,
} from '../engine'
import type { ServiceBase } from '../../contracts'
import type { WithPath } from '../../http'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { WsConnectionURI, WsURI } from '../uri'

export interface WsRouteConnection
  extends
    Pick<ServiceBase, 'env' | 'middlewares' | 'postprocessors' | 'onError'>,
    WithPath,
    Tag<WsConnectionURI> {
  handlers: WsHandlers[]
  onConnection?: Pick<ServiceBase, 'guardian' | 'handler'>
}

export function WsRouteConnection({
  path,
  handlers,
  middlewares,
  postprocessors,
  onConnection,
  onError,
  env,
}: WsRouteConnectionConfig): WsConnectionEngineBinder {
  const target = (engine: WsConnectionEngine) =>
    engine.mount({
      path,
      handlers,
      middlewares,
      postprocessors,
      onConnection,
      onError,
      env,
      tag: WsConnectionURI,
    })

  return applyEntry('resource', WsURI)(target)
}
