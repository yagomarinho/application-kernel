/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsConnectionJob } from './ws.connection'
import type { WsHandlersJob } from './ws.handlers.job'

export type WsJobs = WsConnectionJob | WsHandlersJob
