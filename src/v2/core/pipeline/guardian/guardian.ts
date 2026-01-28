/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable, Result } from '@yagomarinho/domain-kernel'

import type { ApplicationContext } from '../../data'

export interface Guardian<Input = any, Output = any, Env = any, Error = any> {
  (
    input: Input,
    env: Env,
    context: ApplicationContext,
  ): Resolvable<Result<Error, Output>>
}
