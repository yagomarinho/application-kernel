/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'
import type { Merge } from '@yagomarinho/ts-toolkit'

import type { Messaging } from '../../../messaging'
import type { WithWsIncomingAdapter } from '../capabilities'
import type { WsEventHandlerURI } from '../../uri'

export interface WsEventHandler
  extends
    Merge<Messaging.EventHandler, Tag<WsEventHandlerURI>>,
    WithWsIncomingAdapter {}
