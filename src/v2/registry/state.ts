/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface StateKey<T> {
  readonly id: symbol
}

export function StateKey<T>(key: string): StateKey<T> {
  return {
    id: Symbol(key),
  }
}

export interface State {
  set<T>(key: StateKey<T>, value: T): void
  get<T>(key: StateKey<T>): T | undefined
  has<T>(key: StateKey<T>): boolean
  clear<T>(key: StateKey<T>): void
}

export function State(initial: Map<symbol, any> = new Map()): State {
  const set: State['set'] = (key, value) => {
    initial.set(key.id, value)
  }

  const get: State['get'] = key => initial.get(key.id)

  const has: State['has'] = key => initial.has(key.id)

  const clear: State['clear'] = key => {
    initial.delete(key.id)
  }

  return {
    set,
    get,
    has,
    clear,
  }
}
