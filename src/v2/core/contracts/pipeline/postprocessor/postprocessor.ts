/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ExecutionContext,
  Resolvable,
  Successful,
} from '@yagomarinho/domain-kernel'

export interface Postprocessor<Input = any, Output = any, Env = any> {
  (input: Input, env: Env, ctx: ExecutionContext): Resolvable<Output>
}

export interface ExtendedPostProcessor {
  (input: any, env: any, ctx: ExecutionContext): Resolvable<Successful>
}

export function postprocessorsChain(
  processors: Postprocessor[],
): ExtendedPostProcessor {
  return (input: any, env: any, ctx: ExecutionContext): Successful => {
    if (!processors.length) return input

    const resp = processors.reduce(
      (output, processor) => processor(output, env, ctx),
      input,
    )

    return Successful(resp)
  }
}
