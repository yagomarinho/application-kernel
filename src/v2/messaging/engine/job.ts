/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Job } from '../../contracts'
import { AcceptIncoming, EndsEmits } from '../composition'
import { CommandhandlerURI, EventHandlerURI, MessagingURI } from '../uri'

export interface EventJob extends Job<MessagingURI>, AcceptIncoming {
  type: EventHandlerURI
}

export interface CommandJob
  extends Job<MessagingURI>, AcceptIncoming, EndsEmits {
  type: CommandhandlerURI
}

export type MessagingJob = EventJob | CommandJob
