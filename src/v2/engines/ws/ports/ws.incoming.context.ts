/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface WsIncomingMessage<S = any> {
  endpoint: string
  headers: Record<string, string>
  query: Record<string, string>
  body: unknown
  socket: S
}
