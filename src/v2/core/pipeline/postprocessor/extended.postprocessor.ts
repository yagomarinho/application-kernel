/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable, Successful } from '@yagomarinho/domain-kernel'
import type { ApplicationContext } from '../../data'

export interface ExtendedPostProcessor {
  (input: any, env: any, context: ApplicationContext): Resolvable<Successful>
}
