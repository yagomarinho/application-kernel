/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExecutionContext, Resolvable } from '@yagomarinho/domain-kernel'
import type { Emits } from '../../messaging'
import type { Audience } from '../ports'

export interface AudienceResolver {
  (
    audience: Audience[],
    env: any,
    ctx: ExecutionContext,
  ): Resolvable<Audience[]>
}

export interface EmitsWsOutput extends Emits {
  target: 'ws'
  audience: AudienceResolver[]
}

export interface EmitsEmitterOutput extends Emits {
  target: 'emitter'
}

export type DerivedEmits = EmitsWsOutput | EmitsEmitterOutput

export interface DerivedEndsEmits {
  emits: DerivedEmits
}
