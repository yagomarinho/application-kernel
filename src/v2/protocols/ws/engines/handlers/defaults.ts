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
} from '../../../../core/application.service'
import { IncomingAdapter } from '../../composition'

export interface WsHandlersDefaults extends ApplicationServiceDefaults {
  incomingAdapter: IncomingAdapter
}

export function resolveWsHandlersDefaults({
  incomingAdapter = identity,
  ...rest
}: Partial<WsHandlersDefaults> = {}): WsHandlersDefaults {
  const serviceDefaults = resolveApplicationServiceDefaults(rest)

  return {
    incomingAdapter,
    ...serviceDefaults,
  }
}
