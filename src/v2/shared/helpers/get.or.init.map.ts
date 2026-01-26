/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Ambient, AmbientKey } from '../../core'

export function getOrInitMap<K, V>(
  env: Ambient,
  key: AmbientKey<Map<K, V>>,
): Map<K, V> {
  const map = env.get(key)
  if (map) return map

  const next = new Map<K, V>()
  env.set(key, next)
  return next
}
