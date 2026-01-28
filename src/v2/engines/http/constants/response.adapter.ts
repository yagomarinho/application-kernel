/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpResponse } from '../contracts'

import { type Result, isFailure } from '@yagomarinho/domain-kernel'

export function responseAdapter(result: Result): HttpResponse {
  if (isFailure(result)) throw new Error(result.error)

  return { status: 200, body: result.data, headers: {} }
}
