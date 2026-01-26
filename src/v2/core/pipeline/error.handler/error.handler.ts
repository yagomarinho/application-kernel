/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExecutionContext, Resolvable } from '@yagomarinho/domain-kernel'

export interface ErrorHandler<Output = any, Env = any, Error = any> {
  (error: Error, env: Env, context: ExecutionContext): Resolvable<Output>
}
