/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EnvironmentKey } from './environment.key'

export interface Environment {
  set<T>(key: EnvironmentKey<T>, value: T): void
  get<T>(key: EnvironmentKey<T>): T | undefined
  has<T>(key: EnvironmentKey<T>): boolean
  clear<T>(key: EnvironmentKey<T>): void
}

export function createEnvironment(
  initial: Map<symbol, any> = new Map(),
): Environment {
  const set: Environment['set'] = (key, value) => {
    initial.set(key.id, value)
  }

  const get: Environment['get'] = key => initial.get(key.id)

  const has: Environment['has'] = key => initial.has(key.id)

  const clear: Environment['clear'] = key => {
    initial.delete(key.id)
  }

  return {
    set,
    get,
    has,
    clear,
  }
}
