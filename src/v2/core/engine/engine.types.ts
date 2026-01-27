/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Compilation } from '../meta'

export type InOut<In = any, Out = any> = {
  in: In
  out: Out
}

export type JobFromCompilation<C extends Compilation> = C['job']

export type InOutFromCompilation<C extends Compilation> =
  C extends Compilation<any, infer In, infer Out> ? InOut<In, Out> : InOut
