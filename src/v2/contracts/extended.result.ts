/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ExecutionContext,
  Failure,
  Successful,
} from '@yagomarinho/domain-kernel'

export interface ExtendedSuccessful extends Successful {
  ctx: ExecutionContext
}

export interface ExtendedFailure extends Failure {
  ctx: ExecutionContext
}

export type ExtendedResult = ExtendedFailure | ExtendedSuccessful
