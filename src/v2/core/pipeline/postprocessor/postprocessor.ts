/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'
import type { ApplicationContext } from '../../data'

export interface Postprocessor<Input = any, Output = any, Env = any> {
  (input: Input, env: Env, context: ApplicationContext): Resolvable<Output>
}
