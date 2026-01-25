/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Audience } from '../ws'
import type { Job } from '../contracts'
import type { Registry } from './registry'

export interface WsRegistry extends Registry {
  audiences: {
    register(job: Job, audience: Audience): void
    resolve(job: Job): Audience[]
  }
}
