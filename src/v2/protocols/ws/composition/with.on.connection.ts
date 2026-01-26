/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationService } from '../../../core/application.service'
import { EndsEmits } from '../../messaging'
import { DerivedEndsEmits } from './derived.ends.emits'
import { WithWsAdapter } from './with.ws.adapter'

export type OnConnectionEvent = Omit<ApplicationService, 'tag'> & WithWsAdapter

export type OnConnectionCommand = OnConnectionEvent &
  (EndsEmits | DerivedEndsEmits)

export type OnConnection = OnConnectionEvent | OnConnectionCommand

export interface WithOnConnection {
  onConnection: OnConnection
}
