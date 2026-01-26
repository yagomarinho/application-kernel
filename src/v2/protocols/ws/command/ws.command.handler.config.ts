/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Emits } from '../../messaging'
import type { WsCommandHandler } from './ws.command.handler'

type RequiredKeys = 'on' | 'emits' | 'handler'

type ConfigWithEndsEmitsVariant = Omit<WsCommandHandler, 'emits'> & {
  emits: string | Emits
}

export type WsCommandHandlerConfig = Partial<
  Omit<WsCommandHandler, RequiredKeys>
> &
  Pick<ConfigWithEndsEmitsVariant, RequiredKeys>
