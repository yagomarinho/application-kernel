/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ApplicationServiceDefaults,
  resolveApplicationServiceDefaults,
  identity,
  doneDefault,
} from '../../../application.service'
import { OnConnection, WithWsAdapter } from '../../composition'

type OmittedKeys = 'guardian'

type OnConnectionDefaults = Omit<OnConnection, 'emits'>

interface WithOnConnectionDefaults {
  onConnection: OnConnectionDefaults
}

export interface WsRouteConnectionDefaults
  extends
    Omit<ApplicationServiceDefaults, OmittedKeys>,
    WithOnConnectionDefaults,
    WithWsAdapter {}

export type WsRouteConnectionDefaultsToResolve = Partial<
  Omit<WsRouteConnectionDefaults, 'onConnection'> & {
    onConnection: Partial<OnConnectionDefaults>
  }
>

export function resolveWsRouteConnectionDefaults({
  onConnection,
  ...rest
}: WsRouteConnectionDefaultsToResolve = {}): WsRouteConnectionDefaults {
  const onConnectionServiceDefaults =
    resolveApplicationServiceDefaults(onConnection)

  const { env, middlewares, onError, postprocessors } =
    resolveApplicationServiceDefaults({
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
