/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Resource, Tag } from '@yagomarinho/domain-kernel'
import { ServiceBase } from './service.base'

export type RequiredTaggable<C extends Partial<Tag>> = C extends {
  tag?: string
}
  ? {
      [K in Exclude<keyof C, 'tag'>]: C[K]
    } & { tag: NonNullable<C['tag']> }
  : any

export type EngineBinder<E extends Engine, T extends string> = ((
  engine: E,
) => ReturnType<E['mount']>) &
  Resource<T>

export interface Engine<
  C extends Partial<Tag> = any,
  S extends ServiceBase = any,
> {
  mount: (config: RequiredTaggable<C>) => S
}
