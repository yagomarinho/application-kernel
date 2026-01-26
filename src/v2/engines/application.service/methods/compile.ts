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
  type WithEnvironment,
  postprocessorsChain,
  middlewareChain,
} from '../../../core'
import { resolveServicePipeline } from '../resolvers'

export interface CompileApplicationService extends WithEnvironment {}

export function compileApplicationService({
  environment,
}: CompileApplicationService) {
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
      execute: ({ data, context }) => pipeline(data, env(environment), context),
    }

    return [
      {
        job: { id: '', tag: '' },
        execution,
      },
    ]
  }
}
