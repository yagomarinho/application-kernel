/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'

import type { ApplicationPayload } from '../data'
import type { Compilation } from '../meta'
import type { RequiredTaggable } from '../primitives'
import type { InOutFromCompilation, JobFromCompilation } from './engine.types'

export interface Engine<
  Config = any,
  Declaration = any,
  Comp extends Compilation = Compilation,
> {
  declare: (config: RequiredTaggable<Config>) => Declaration

  compile: (declaration: Declaration) => Comp[]

  run: (
    job: JobFromCompilation<Comp>,
    payload: ApplicationPayload<InOutFromCompilation<Comp>['in']>,
  ) => Resolvable<InOutFromCompilation<Comp>['out']>

  jobs: () => JobFromCompilation<Comp>[]
}
