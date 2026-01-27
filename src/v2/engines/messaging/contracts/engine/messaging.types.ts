/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CommandHandler } from '../command.handler'
import type { CommandConfig, MessagingConfig } from '../config'
import type { EventHandler } from '../event.handler'

export type MessagingMapper<C extends MessagingConfig> = C extends CommandConfig
  ? CommandHandler
  : EventHandler
