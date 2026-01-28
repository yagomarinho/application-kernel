/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface WsOnConnectionEventJob extends Job<WsURI> {
  origin: WsRouteConnectionURI
  type: 'event'
}
export interface WsOnConnectionCommandJob extends Job<WsURI> {
  origin: WsRouteConnectionURI
  type: 'command'
  emits: Emits | DerivedEmits
}

export type WsRouteConnectionJob =
  | WsOnConnectionEventJob
  | WsOnConnectionCommandJob
