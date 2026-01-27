/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Execution } from '../../../core'
import { mapResolvable } from '../../../shared'
import { ServiceEngine } from '../../application.service'
import { HttpRequest, HttpResponse, HttpRoute } from '../contracts'

export interface ResolveHttpPipeline {
  serviceEngine: ServiceEngine
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
