/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsIncomingContext } from '../ports'

export type IncomingAdapter = (incoming: WsIncomingContext) => any

export interface WithWsAdapter {
  incomingAdapter: IncomingAdapter
}
