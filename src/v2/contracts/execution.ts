/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable, Result } from '@yagomarinho/domain-kernel'
import type { ApplicationPayload } from './application.payload'

export interface Execution {
  execute: (payload: ApplicationPayload) => Resolvable<Result>
}
