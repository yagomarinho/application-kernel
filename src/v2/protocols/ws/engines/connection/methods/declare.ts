/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RequiredTaggable } from '../../../../../core/contracts'
import {
  WsRouteConnection,
  WsRouteConnectionConfig,
} from '../../../route.connection'
import { WsHandlersEngine } from '../../handlers'
import { WsRouteConnectionDefaults } from '../defaults'

export function declareWsRouteConnection(
  defaults: WsRouteConnectionDefaults,
  handlersEngine: WsHandlersEngine,
) {
  return ({
    path,
    handlers,
    onConnection,
    env = defaults.env,
    middlewares = defaults.middlewares,
    onError = defaults.onError,
    postprocessors = defaults.postprocessors,
    incomingAdapter = defaults.incomingAdapter,
    tag,
  }: RequiredTaggable<WsRouteConnectionConfig>): WsRouteConnection => ({
    env,
    handlers: handlers.map(binder => binder(handlersEngine)),
    middlewares,
    onConnection: {
      ...defaults.onConnection,
      guardian: onConnection?.guardian ?? defaults.onConnection.guardian,
      handler: onConnection?.handler ?? defaults.onConnection.handler,
      incomingAdapter:
        onConnection?.incomingAdapter ?? defaults.onConnection.incomingAdapter,
      emits: onConnection?.emits,
    },
    onError,
    path,
    postprocessors,
    incomingAdapter,
    tag,
  })
}
