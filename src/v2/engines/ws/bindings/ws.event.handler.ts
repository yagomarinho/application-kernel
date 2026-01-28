/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function WsEventHandler({
  on,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  incomingAdapter,
}: WsEventHandlerConfig): WsHandlersEngineBinder {
  const target = (engine: WsHandlersEngine) =>
    engine.declare({
      on,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      incomingAdapter,
      tag: WsEventHandlerURI,
    })

  return applyEntry('resource', WsURI)(target)
}
