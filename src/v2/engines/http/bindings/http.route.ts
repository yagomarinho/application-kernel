/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpConfig, HttpEngine, HttpEngineBinder } from '../contracts'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { HttpRouteURI, HttpURI } from '../uri'

export function HttpRoute({
  method,
  path,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  adapters,
}: HttpConfig): HttpEngineBinder {
  const binder = (engine: HttpEngine) =>
    engine.declare({
      method,
      path,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      adapters,
      tag: HttpRouteURI,
    })

  return applyEntry('resource', HttpURI)(binder)
}
