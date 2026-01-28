/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CommandHandler } from '../bindings/command.handler'
import type { CommandConfig, MessagingConfig } from '../config'
import type { EventHandler } from '../bindings/event.handler'
import type { MessagingHandler } from '../bindings/messaging.handler'
import type { CommandCompilation, EventCompilation } from '../meta'

export type MessagingMapper<C extends MessagingConfig> = C extends CommandConfig
  ? CommandHandler
  : EventHandler

export type MessagingCompilationMapper<C extends MessagingHandler> =
  C extends CommandHandler ? CommandCompilation : EventCompilation
