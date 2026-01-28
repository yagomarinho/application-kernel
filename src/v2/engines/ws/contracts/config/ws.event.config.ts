/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type RequiredKeys = 'on' | 'handler'

export type WsEventHandlerConfig = Partial<Omit<WsEventHandler, RequiredKeys>> &
  Pick<WsEventHandler, RequiredKeys>
