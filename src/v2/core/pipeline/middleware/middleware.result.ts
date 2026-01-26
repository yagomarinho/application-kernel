/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Failure } from '@yagomarinho/domain-kernel'
import type { Next } from './next'

export type MiddlewareResult<Error = any, Data = any> =
  | Failure<Error>
  | Next<Data>
