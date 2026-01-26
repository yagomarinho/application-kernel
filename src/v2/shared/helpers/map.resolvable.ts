/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Resolvable } from '@yagomarinho/domain-kernel'

type Resolved<A> = A extends Resolvable<infer P> ? P : A

export function mapResolvable<A, B>(
  resolvable: Resolvable<A>,
  fn: (value: A) => B,
): Resolvable<Resolved<ReturnType<typeof fn>>> {
  if (resolvable instanceof Promise) return resolvable.then(fn) as any
  return fn(resolvable) as any
}
