/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Failure, isFailure, isTagged } from '@yagomarinho/domain-kernel'

export type NonFailure<A> = Exclude<A, Failure>

export function byPassFailure<A, B>(fn: (value: NonFailure<A>) => B) {
  return (input: A) => {
    if (isTagged(input) && isFailure(input)) return input
    return fn(input as any)
  }
}
