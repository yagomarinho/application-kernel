/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Pointer<T> = ReturnType<typeof Pointer<T>>

export function Pointer<T>(init: T) {
  let pointer = init

  function set(value: T) {
    pointer = value
  }

  function get() {
    return pointer
  }

  return {
    set,
    get,
  }
}
