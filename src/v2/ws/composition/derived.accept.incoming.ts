/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WithAdapter } from './with.adapter'

interface AcceptWsIncoming extends Partial<WithAdapter> {
  source: 'ws'
  event: string
}

interface AcceptEmitterIncoming {
  source: 'emitter'
  event: string
}

export interface DerivedAcceptIncoming {
  on: AcceptWsIncoming | AcceptEmitterIncoming
}
