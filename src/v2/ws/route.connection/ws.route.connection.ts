/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { ApplicationService } from '../../application.service'
import type { WsRouteConnectionConfig } from './ws.route.connection.config'
import type {
  WsRouteConnectionEngine,
  WsRouteConnectionEngineBinder,
} from '../engine'
import type { WithPath } from '../../http'
import type { WithHandlers, WithOnConnection } from '../composition'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { WsConnectionURI, WsURI } from '../uri'

export interface WsRouteConnection
  extends
    Pick<
      ApplicationService,
      'env' | 'middlewares' | 'postprocessors' | 'onError'
    >,
    WithPath,
    WithOnConnection,
    WithHandlers,
    Tag<WsConnectionURI> {}

export function WsRouteConnection({
  path,
  handlers,
  middlewares,
  postprocessors,
  onConnection,
  onError,
  env,
}: WsRouteConnectionConfig): WsRouteConnectionEngineBinder {
  const target = (engine: WsRouteConnectionEngine) =>
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
