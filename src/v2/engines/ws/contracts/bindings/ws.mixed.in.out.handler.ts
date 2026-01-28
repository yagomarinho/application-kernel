/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EmitterToWsHandler } from './emitter.to.ws.handler'
import type { WsToEmitterHandler } from './ws.to.emitter.handler'

export type WsMixedInOutHandler = WsToEmitterHandler | EmitterToWsHandler
