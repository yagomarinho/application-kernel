/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Identifiable, Tag } from '@yagomarinho/domain-kernel'

export interface Job<T extends string = string> extends Identifiable, Tag<T> {}

export function Job<T extends string = string>(id = '', tag = '' as T): Job<T> {
  return { id, tag }
}
