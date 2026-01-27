/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../../../../core'
import type { CommandhandlerURI, MessagingURI } from '../../uri'
import type { WithEmits, WithOn } from '../capabilities'

export interface CommandJob
  extends Job<MessagingURI>, WithOn<string>, WithEmits<string> {
  type: CommandhandlerURI
}
