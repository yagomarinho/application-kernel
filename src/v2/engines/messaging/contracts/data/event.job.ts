/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../../../../core'
import type { EventHandlerURI, MessagingURI } from '../../uri'
import type { WithOn } from '../capabilities'

export interface EventJob extends Job<MessagingURI>, WithOn<string> {
  type: EventHandlerURI
}
