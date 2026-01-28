/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface WsCommandHandlerJob
  extends Job<WsHandlersURI>, AcceptIncoming, EndsEmits {
  type: WsCommandHandlerURI
}
