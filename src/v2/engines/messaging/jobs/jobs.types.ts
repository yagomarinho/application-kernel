/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  CommandHandler,
  CommandJob,
  EventHandler,
  EventJob,
  ExclusiveCommandRequiredKeys,
  ExclusiveEventRequiredKeys,
  MessagingHandler,
} from '../contracts'

export type MessagingHandlerToJobDeclarationMapper<C extends MessagingHandler> =
  C extends CommandHandler
    ? Pick<CommandHandler, ExclusiveCommandRequiredKeys | 'tag'>
    : Pick<EventHandler, ExclusiveEventRequiredKeys | 'tag'>

export type MessagingHandlerToJobMapper<C extends MessagingHandler> =
  C extends CommandHandler ? CommandJob : EventJob
