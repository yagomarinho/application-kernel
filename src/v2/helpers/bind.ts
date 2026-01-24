/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'
import { mapResolvable } from './map.resolvable'
import { byPassFailure, type NonFailure } from './by.pass.failure'

export function bind<A, B>(
  resolvable: Resolvable<A>,
  fn: (value: NonFailure<A>) => B,
) {
  return mapResolvable(resolvable, byPassFailure(fn))
}
