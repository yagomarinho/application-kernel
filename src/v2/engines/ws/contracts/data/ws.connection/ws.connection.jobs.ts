/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsConnectionCommandJob } from './ws.connection.command.job'
import type { WsConnectionEventJob } from './ws.connection.event.job'

export type WsConnectionJob = WsConnectionEventJob | WsConnectionCommandJob
