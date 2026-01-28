/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { ApplicationService } from '../../../application.service'
import type { WsMixedEventHandlerURI } from '../../uri'
import type { Messaging } from '../../../messaging'
import type { EmitterIncomingEvent, WsOutgoingEvent } from '../meta'

export interface EmitterToWsHandler
  extends
    ApplicationService.ApplicationService,
    Tag<WsMixedEventHandlerURI>,
    Messaging.WithOn<EmitterIncomingEvent>,
    Messaging.WithEmits<WsOutgoingEvent> {}
