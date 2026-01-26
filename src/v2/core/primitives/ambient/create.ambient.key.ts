/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { AmbientKey } from './ambient.key'

export function createAmbientKey<T>(key: string): AmbientKey<T> {
  return {
    id: Symbol(key),
  }
}
