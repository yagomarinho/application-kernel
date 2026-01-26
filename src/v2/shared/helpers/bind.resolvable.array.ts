/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'

export function bindResolvableArray<T>(
  resolvableArray: Resolvable<T>[],
): Resolvable<T[]> {
  return resolvableArray.reduce(
    (arr, resolvable) => {
      if (resolvable instanceof Promise) {
        return resolvable.then(bindValue(arr))
      }
      return bindValue(arr)(resolvable)
    },
    [] as Resolvable<T[]>,
  )
}

function bindValue<T>(arr: Resolvable<T[]>) {
  return (value: T): Resolvable<T[]> => {
    if (arr instanceof Promise) return arr.then(a => a.concat(value))
    return arr.concat(value)
  }
}
