/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Postprocessor } from './postprocessor'
import type { ExtendedPostProcessor } from './extended.postprocessor'

import { type ExecutionContext, Successful } from '@yagomarinho/domain-kernel'

export function postprocessorsChain(
  processors: Postprocessor[],
): ExtendedPostProcessor {
  return (input: any, env: any, context: ExecutionContext): Successful => {
    if (!processors.length) return Successful(input)

    const resp = processors.reduce(
      (output, processor) => processor(output, env, context),
      input,
    )

    return Successful(resp)
  }
}
