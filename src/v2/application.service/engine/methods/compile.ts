/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Compilation,
  Execution,
  Job,
  middlewareChain,
  postprocessorsChain,
} from '../../../contracts'
import { applicationPipeline } from '../../../helpers'
import { ApplicationService } from '../../application.service'
import { WithGlobalEnvGetter } from '../../composition'

interface CompileApplication extends WithGlobalEnvGetter {}

export function compileApplicationService({ globalEnv }: CompileApplication) {
  return ({
    env: Env,
    guardian,
    handler,
    middlewares,
    onError,
    postprocessors,
  }: ApplicationService): Compilation[] => {
    const pipeline = applicationPipeline(
      middlewareChain(middlewares),
      guardian,
      handler,
      postprocessorsChain(postprocessors),
      onError,
    )

    const execution: Execution = {
      execute: ({ data, context }) => pipeline(data, Env(globalEnv()), context),
    }

    return [
      {
        job: Job(),
        execution,
      },
    ]
  }
}
