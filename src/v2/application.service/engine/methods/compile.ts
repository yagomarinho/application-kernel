/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ApplicationPayload,
  Compilation,
  Execution,
  middlewareChain,
  postprocessorsChain,
} from '../../../contracts'
import { applicationPipeline } from '../../../helpers'
import { ApplicationService } from '../../application.service'

export interface EnvGetter {
  (): any
}

interface WithEnvGetter {
  globalEnv: EnvGetter
}

interface CompileApplication extends ApplicationService, WithEnvGetter {}

export function compileApplicationService<Payload extends ApplicationPayload>({
  globalEnv,
  env: Env,
  guardian,
  handler,
  middlewares,
  onError,
  postprocessors,
}: CompileApplication): Compilation<void, Payload> {
  // aqui é onde eu tenho que construir a pipeline todinha
  const execution: Execution<Payload> = {
    execute: ({ data, context }) => {
      const pipeline = applicationPipeline(
        middlewareChain(middlewares),
        guardian,
        handler,
        postprocessorsChain(postprocessors),
        onError,
      )

      return pipeline(data, Env(globalEnv()), context)
    },
  }

  return {
    job: undefined,
    execution,
  }
}
