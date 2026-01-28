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
import type { CommandhandlerURI, EventHandlerURI } from '../uri'

export type CreateMessagingJobDeclaration<T extends MessagingHandler> =
  DeclarationPicker[T['tag']]

export type DeclarationPicker = {
  [EventHandlerURI]: Pick<EventHandler, ExclusiveEventRequiredKeys | 'tag'>
  [CommandhandlerURI]: Pick<
    CommandHandler,
    ExclusiveCommandRequiredKeys | 'tag'
  >
}

export type JobPicker = {
  [EventHandlerURI]: EventJob
  [CommandhandlerURI]: CommandJob
}
