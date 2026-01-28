/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'
import type { Messaging } from '../../messaging'
import type { Audience } from '../ports'
import type { ApplicationContext } from '../../../core'

export interface AudienceResolver {
  (
    audience: Audience[],
    env: any,
    ctx: ApplicationContext,
  ): Resolvable<Audience[]>
}

export interface EmitsWsOutput extends Messaging.Emits<string> {
  target: 'ws'
  audience: AudienceResolver[]
}

export interface EmitsEmitterOutput extends Messaging.Emits<string> {
  target: 'emitter'
}

export type DerivedEmits = EmitsWsOutput | EmitsEmitterOutput

export interface DerivedEndsEmits {
  emits: DerivedEmits
}
