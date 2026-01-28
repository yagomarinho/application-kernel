/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Execution } from '../../../core'
import type { ApplicationService } from '../../application.service'
import type { HttpRequest, HttpResponse, HttpRoute } from '../contracts'

import { mapResolvable } from '../../../shared'

export interface ResolveHttpPipeline {
  serviceEngine: ApplicationService.ServiceEngine
  declaration: HttpRoute
}

export function resolveHttpPipeline({
  declaration: {
    adapters,
    env,
    guardian,
    handler,
    middlewares,
    onError,
    postprocessors,
  },
  serviceEngine,
}: ResolveHttpPipeline): Execution<HttpRequest, HttpResponse>['execute'] {
  const [{ execution }] = serviceEngine.compile({
    env,
    guardian,
    handler,
    middlewares,
    onError,
    postprocessors,
  })

  return ({ context, data }) =>
    mapResolvable(
      execution.execute({ data: adapters.requestAdapter(data), context }),
      result => adapters.responseAdapter(result),
    )
}
