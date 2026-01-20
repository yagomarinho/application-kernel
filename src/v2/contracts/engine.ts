/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Resource, Tag } from '@yagomarinho/domain-kernel'

export type RequiredTaggable<C extends { tag?: string }> = C & {
  tag: NonNullable<C['tag']>
}

export type EngineBinder<E extends Engine, T extends string> = ((
  engine: E,
) => ReturnType<E['mount']>) &
  Resource<T>

export interface Engine<C extends Partial<Tag> = any, S = any> {
  mount: (config: RequiredTaggable<C>) => S
}
