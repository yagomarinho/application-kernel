/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function getOrInitArray<K, T>(map: Map<K, T[]>, key: K): T[] {
  const existing = map.get(key)
  if (existing) return existing

  const created: T[] = []
  map.set(key, created)
  return created
}
