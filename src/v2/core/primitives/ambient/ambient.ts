/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { AmbientKey } from './ambient.key'

export interface Ambient {
  set<T>(key: AmbientKey<T>, value: T): void
  get<T>(key: AmbientKey<T>): T | undefined
  has<T>(key: AmbientKey<T>): boolean
  clear<T>(key: AmbientKey<T>): void
}
