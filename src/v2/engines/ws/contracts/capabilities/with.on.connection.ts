/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Merge } from '@yagomarinho/ts-toolkit'
import { ApplicationService } from '../../../application.service'
import { DerivedEndsEmits } from './derived.ends.emits'
import { WithIncomingAdapter } from './with.incoming.adapter'
import { Messaging } from '../../../messaging'

export type OnConnectionEvent = Merge<
  Omit<ApplicationService.ApplicationService, 'tag'>,
  WithIncomingAdapter
>

export type OnConnectionCommand = OnConnectionEvent &
  (Messaging.WithEmits<string> | DerivedEndsEmits)

export type OnConnection = OnConnectionEvent | OnConnectionCommand

export interface WithOnConnection {
  onConnection: OnConnection
}
