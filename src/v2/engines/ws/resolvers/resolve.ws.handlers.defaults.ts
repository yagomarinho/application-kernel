/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface WsHandlersDefaults extends ServiceDefaults {
  incomingAdapter: IncomingAdapter
}

export function resolveWsHandlersDefaults({
  incomingAdapter = identity,
  ...rest
}: Partial<WsHandlersDefaults> = {}): WsHandlersDefaults {
  const serviceDefaults = resolveServiceDefaults(rest)

  return {
    incomingAdapter,
    ...serviceDefaults,
  }
}
