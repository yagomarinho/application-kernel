/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { ApplicationService } from '../../../application.service'
import type { WsMixedInOutURI } from '../../uri'
import type { Messaging } from '../../../messaging'
import type { EmitterOutgoingEvent, WsIncomingEvent } from '../meta'

export interface WsToEmitterHandler
  extends
    ApplicationService.ApplicationService,
    Tag<WsMixedInOutURI>,
    Messaging.WithOn<WsIncomingEvent>,
    Messaging.WithEmits<EmitterOutgoingEvent> {}
