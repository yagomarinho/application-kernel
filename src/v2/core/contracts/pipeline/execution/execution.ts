/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'
import type { ApplicationPayload } from '../../data/application.payload'

export interface Execution<In = any, Out = any> {
  execute: (payload: ApplicationPayload<In>) => Resolvable<Out>
}
