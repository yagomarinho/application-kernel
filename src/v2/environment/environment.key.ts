/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface EnvironmentKey<T> {
  readonly id: symbol
}

export function createEnvironmentKey<T>(key: string): EnvironmentKey<T> {
  return {
    id: Symbol(key),
  }
}
