/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Resolvable } from '@yagomarinho/domain-kernel'

import type { ApplicationPayload } from '../data'
import type { Compilation } from '../meta'
import type { WithDefaults } from '../capabilities'
import type { RequiredTaggable } from '../primitives'

type InOut<In = any, Out = any> = {
  in: In
  out: Out
}

type JobFromCompilation<C extends Compilation> = C['job']
type InOutFromCompilation<C extends Compilation> =
  C extends Compilation<any, infer In, infer Out> ? InOut<In, Out> : InOut

export interface DeclareOptions<D> extends WithDefaults<D> {}
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
