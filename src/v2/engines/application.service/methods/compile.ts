/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ApplicationService } from '../contracts'

import {
  type Compilation,
  type Execution,
  type WithEnvView,
  postprocessorsChain,
  middlewareChain,
} from '../../../core'
import { resolveServicePipeline } from '../resolvers'

export interface CompileApplicationService extends WithEnvView {}

export function compileApplicationService({ view }: CompileApplicationService) {
  return ({
    env,
    guardian,
    handler,
    middlewares,
    onError,
    postprocessors,
  }: ApplicationService): Compilation[] => {
    const pipeline = resolveServicePipeline(
      middlewareChain(middlewares),
      guardian,
      handler,
      postprocessorsChain(postprocessors),
      onError,
    )

    const execution: Execution = {
      execute: ({ data, context }) =>
        pipeline(data, view.env.resolve(env), context),
    }

    return [
      {
        job: { id: '', tag: '' },
        execution,
      },
    ]
  }
}
