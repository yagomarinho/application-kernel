/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Emits } from '../composition'
import type { CommandHandler } from './command.handler'

type RequiredKeys = 'on' | 'emits' | 'handler'

type ConfigWithEndsEmitsVariant = Omit<CommandHandler, 'emits'> & {
  emits: string | Emits
}

export type CommandHandlerConfig = Partial<Omit<CommandHandler, RequiredKeys>> &
  Pick<ConfigWithEndsEmitsVariant, RequiredKeys>
