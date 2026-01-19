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
import { OnConnection } from '../../composition'

type OmittedKeys = 'guardian'

export interface WsRouteConnectionDefaults extends Omit<
  ApplicationServiceDefaults,
  OmittedKeys
> {
  onConnection: OnConnection
}

export function resolveWsRouteConnectionDefaults({
  onConnection: { guardian, ...restOnconnection } = {
    guardian: doneDefault,
    handler: doneDefault,
    incomingAdapter: identity,
  },
  ...rest
}: Partial<WsRouteConnectionDefaults> = {}): WsRouteConnectionDefaults {
  const { guardian: gDefault, ...serviceDefaults } =
    resolveApplicationServiceDefaults({
      guardian,
      ...rest,
    })

  return {
    ...serviceDefaults,
    onConnection: { guardian: gDefault, ...restOnconnection },
  }
}
