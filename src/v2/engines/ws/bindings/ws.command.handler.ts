/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function WsCommandHandler({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  incomingAdapter,
}: WsCommandHandlerConfig): WsHandlersEngineBinder {
  const target = (engine: WsHandlersEngine) =>
    engine.declare({
      on,
      emits,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      incomingAdapter,
      tag: WsCommandHandlerURI,
    })

  return applyEntry('resource', WsURI)(target)
}
