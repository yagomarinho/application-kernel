/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExecutionContext, Resolvable } from '@yagomarinho/domain-kernel'

export interface Postprocessor<Input = any, Output = any, Env = any> {
  (data: Input, env: Env, ctx: ExecutionContext): Resolvable<Output>
}

export type PostprocessorChain<Input, Output = Input> = Postprocessor<
  any,
  any
>[] & {
  __input?: Input
  __output?: Output
}

export function PostprocessorChain<Chain extends Postprocessor<any, any>[]>(
  ...postprocessors: Chain
): Chain {
  return postprocessors
}
