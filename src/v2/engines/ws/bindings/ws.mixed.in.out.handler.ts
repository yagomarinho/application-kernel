/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function WsMixedEventHandler({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: WsMixedEventHandlerConfig): WsHandlersEngineBinder {
  // O correto a se fazer é uma validação antes de empurrar para o engine
  // fica como próxima tarefa
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
      tag: WsMixedEventHandlerURI,
    } as any)

  return applyEntry('resource', WsURI)(target)
}
