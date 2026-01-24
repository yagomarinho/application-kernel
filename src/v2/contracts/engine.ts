/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable, Result, Tag } from '@yagomarinho/domain-kernel'
import type { ApplicationPayload } from './application.payload'
import type { Compilation } from './compilation'
import { Job } from './job'

export type RequiredTaggable<C extends { tag?: string }> = C & {
  tag: NonNullable<C['tag']>
}

export interface WithDefaults<D> {
  defaults: D
}

export interface DeclareOptions<D> extends WithDefaults<D> {}
export interface Engine<
  Config extends Partial<Tag> = any,
  Declaration = any,
  J extends Job = any,
> {
  declare: (config: RequiredTaggable<Config>) => Declaration
  compile: (declaration: Declaration) => Compilation<J>[]
  run: (job: J, payload: ApplicationPayload) => Resolvable<Result>
  jobs: () => ReadonlyArray<J>
}
