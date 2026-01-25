/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { ApplicationService } from '../../application.service'
import type { WithHttpAdapters, WithHttpMethod, WithPath } from '../composition'
import type { HttpRouteConfig } from './config'
import type { HttpEngine, HttpEngineBinder } from '../engine'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { HttpURI } from '../uri'

export const HttpRouteURI = 'http.route'
export type HttpRouteURI = typeof HttpRouteURI

export interface HttpRoute
  extends
    ApplicationService,
    WithHttpMethod,
    WithPath,
    WithHttpAdapters,
    Tag<HttpRouteURI> {}

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
}: HttpRouteConfig): HttpEngineBinder {
  const target = (engine: HttpEngine) =>
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

  return applyEntry('resource', HttpURI)(target)
}
