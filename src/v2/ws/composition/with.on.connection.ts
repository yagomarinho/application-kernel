/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationService } from '../../application.service'
import { WithWsAdapter } from './with.ws.adapter'

export interface OnConnection
  extends Pick<ApplicationService, 'guardian' | 'handler'>, WithWsAdapter {}

export interface WithOnConnection {
  onConnection: OnConnection
}
