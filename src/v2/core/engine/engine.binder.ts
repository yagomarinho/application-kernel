/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resource } from '@yagomarinho/domain-kernel'

import type { Engine } from './engine'

export interface EngineBinder<
  E extends Engine,
  T extends string,
> extends Resource<T> {
  (engine: E): ReturnType<E['declare']>
}
