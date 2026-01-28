/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtendedFailure, ApplicationContext } from '../../data'
import type { Resolvable } from '@yagomarinho/domain-kernel'

export interface ErrorHandler<Error = any, Env = any> {
  (
    error: Error,
    env: Env,
    context: ApplicationContext,
  ): Resolvable<ExtendedFailure | Error>
}
