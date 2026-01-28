/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Merge } from '@yagomarinho/ts-toolkit'
import { ApplicationService } from '../../../application.service'
import { WithWsIncomingAdapter } from './with.ws.incoming.adapter'
import { Messaging } from '../../../messaging'
import { MixedOutgoingEvent } from '../meta'

export type OnConnectionEvent = Merge<
  Omit<ApplicationService.ApplicationService, 'tag'>,
  WithWsIncomingAdapter
>

export type OnConnectionCommand = Merge<
  OnConnectionEvent,
  Messaging.WithEmits<string | MixedOutgoingEvent>
>

export type OnConnection = OnConnectionEvent | OnConnectionCommand

export interface WithOnConnection {
  onConnection: OnConnection
}
