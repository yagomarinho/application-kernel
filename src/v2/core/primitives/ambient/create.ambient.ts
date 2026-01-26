/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Ambient } from './ambient'

export function createAmbient(initial: Map<symbol, any> = new Map()): Ambient {
  const set: Ambient['set'] = (key, value) => {
    initial.set(key.id, value)
  }

  const get: Ambient['get'] = key => initial.get(key.id)

  const has: Ambient['has'] = key => initial.has(key.id)

  const clear: Ambient['clear'] = key => {
    initial.delete(key.id)
  }

  return {
    set,
    get,
    has,
    clear,
  }
}
