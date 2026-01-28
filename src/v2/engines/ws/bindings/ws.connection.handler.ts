/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function WsRouteConnection({
  path,
  handlers,
  middlewares,
  postprocessors,
  onConnection,
  onError,
  env,
  incomingAdapter,
}: WsRouteConnectionConfig): WsRouteConnectionEngineBinder {
  const target = (engine: WsRouteConnectionEngine) =>
    engine.declare({
      path,
      handlers,
      middlewares,
      postprocessors,
      onConnection,
      onError,
      env,
      incomingAdapter,
      tag: WsRouteConnectionURI,
    })

  return applyEntry('resource', WsURI)(target)
}
