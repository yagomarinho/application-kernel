/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RequiredTaggable } from '../../../contracts'
import {
  WsRouteConnection,
  WsRouteConnectionConfig,
} from '../../route.connection'
import { WsHandlersEngine } from '../handlers'
import { WsRouteConnectionDefaults } from './defaults'

export function mountWsRouteConnection(
  defaults: WsRouteConnectionDefaults,
  handlerEngine: WsHandlersEngine,
) {
  return ({
    path,
    handlers,
    onConnection,
    env = defaults.env,
    middlewares = defaults.middlewares,
    onError = defaults.onError,
    postprocessors = defaults.postprocessors,
    tag,
  }: RequiredTaggable<WsRouteConnectionConfig>): WsRouteConnection => ({
    env,
    handlers: handlers.map(binder => binder(handlerEngine)),
    middlewares,
    onConnection: {
      guardian: onConnection?.guardian ?? defaults.onConnection.guardian,
      handler: onConnection?.handler ?? defaults.onConnection.handler,
      incomingAdapter:
        onConnection?.incomingAdapter ?? defaults.onConnection.incomingAdapter,
    },
    onError,
    path,
    postprocessors,
    tag,
  })
}
