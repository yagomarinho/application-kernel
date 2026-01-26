/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtendedFailure } from '../../data'
import type { Next } from './next'

export type ExtendedMiddlewareResult = ExtendedFailure | Next
