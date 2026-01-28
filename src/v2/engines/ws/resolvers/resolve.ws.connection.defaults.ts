/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type WsRouteConnectionDefaultsToResolve = Partial<
  Omit<WsRouteConnectionDefaults, 'onConnection'> & {
    onConnection: Partial<OnConnectionDefaults>
  }
>

export function resolveWsRouteConnectionDefaults({
  onConnection,
  ...rest
}: WsRouteConnectionDefaultsToResolve = {}): WsRouteConnectionDefaults {
  const onConnectionServiceDefaults = resolveServiceDefaults(onConnection)

  const { env, middlewares, onError, postprocessors } = resolveServiceDefaults({
    guardian: identity,
    ...rest,
  })

  return {
    env,
    middlewares,
    onError,
    postprocessors,
    onConnection: {
      ...onConnectionServiceDefaults,
      handler: onConnection?.handler ?? doneDefault,
      incomingAdapter: onConnection?.incomingAdapter ?? identity,
    },
    incomingAdapter: rest.incomingAdapter ?? identity,
  }
}
