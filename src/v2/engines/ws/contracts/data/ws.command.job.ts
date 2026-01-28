/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../../../../core'
import type { Messaging } from '../../../messaging'
import type { WsCommandHandlerURI, WsHandlersURI } from '../../uri'

export interface WsCommandJob
  extends
    Job<WsHandlersURI>,
    Messaging.WithOn<string>,
    Messaging.WithEmits<Messaging.Emits<string>> {
  type: WsCommandHandlerURI
}
