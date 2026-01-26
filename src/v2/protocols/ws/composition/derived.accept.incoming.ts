/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WithWsAdapter } from './with.ws.adapter'

export interface AcceptWsIncoming extends WithWsAdapter {
  source: 'ws'
  event: string
}

export interface AcceptEmitterIncoming {
  source: 'emitter'
  event: string
}

export interface DerivedAcceptIncoming {
  on: AcceptWsIncoming | AcceptEmitterIncoming
}
