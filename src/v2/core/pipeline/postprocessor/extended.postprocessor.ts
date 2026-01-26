/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  ExecutionContext,
  Resolvable,
  Successful,
} from '@yagomarinho/domain-kernel'

export interface ExtendedPostProcessor {
  (input: any, env: any, ctx: ExecutionContext): Resolvable<Successful>
}
