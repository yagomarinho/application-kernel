/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Failure, Successful } from '@yagomarinho/domain-kernel'
import type { WithContext } from '../capabilities'

export interface ExtendedSuccessful extends Successful, WithContext {}

export interface ExtendedFailure extends Failure, WithContext {}

export type ExtendedResult = ExtendedFailure | ExtendedSuccessful
