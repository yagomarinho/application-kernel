/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'

import type { ApplicationPayload, Job } from '../data'
import type { Compilation } from '../meta'
import type { WithDefaults } from '../capabilities'
import type { RequiredTaggable } from '../primitives'

export interface DeclareOptions<D> extends WithDefaults<D> {}
export interface Engine<
  Config = any,
  Declaration = any,
  J extends Job = any,
  In = any,
  Out = any,
> {
  declare: (config: RequiredTaggable<Config>) => Declaration

  compile: (declaration: Declaration) => Compilation<J, In, Out>[]

  run: (job: J, payload: ApplicationPayload<In>) => Resolvable<Out>

  jobs: () => ReadonlyArray<J>
}
