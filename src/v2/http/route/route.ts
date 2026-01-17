/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ServiceBase } from '../../contracts'

import type { HttpMethod } from '../method'
import type { HttpResponse } from '../response'
import type { HttpRequest } from '../request'
import type { HttpRouteConfig } from './config'
import type { HttpEngine } from './engine'

export interface HttpRoute<
  RawInput = HttpRequest,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  FinalOutput = Output,
  Env = unknown,
> extends ServiceBase<RawInput, GuardInput, Input, Output, FinalOutput, Env> {
  /**
   * Route identity and transport-level definition.
   * These values are used by the engine to bind the route
   * to the underlying HTTP server (Express, Fastify, etc).
   */
  method: HttpMethod
  path: string

  /**
   * Transport protocol adapters.
   * Defines how raw HTTP requests are translated into
   * application inputs and how final outputs are translated
   * back into HTTP responses.
   *
   * These adapters may be partially or fully overridden
   * by route-level adapters, falling back to global ones
   * when not provided.
   */
  adapters: {
    requestAdapter: (request: HttpRequest) => RawInput
    responseAdapter: (data: FinalOutput) => HttpResponse
  }
}

export function HttpRoute<
  RawInput = HttpRequest,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
>({
  method,
  path,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  adapters,
}: HttpRouteConfig<RawInput, GuardInput, Input, Output, FinalOutput, Env>) {
  return (engine: HttpEngine) =>
    engine.mount({
      method,
      path,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      adapters,
    } as any)
}
