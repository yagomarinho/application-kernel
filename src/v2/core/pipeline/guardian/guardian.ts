/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  ExecutionContext,
  Resolvable,
  Result,
} from '@yagomarinho/domain-kernel'

export interface Guardian<Input = any, Output = any, Env = any, Error = any> {
  (
    input: Input,
    env: Env,
    context: ExecutionContext,
  ): Resolvable<Result<Error, Output>>
}
