/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable } from '../../contracts'
import type { HttpRoute, HttpRouteConfig } from '../route'
import type { HttpRouteDefaults } from './defaults'

import { declareApplicationService } from '../../application.service'

export function declareHttpRoute(defaults: HttpRouteDefaults) {
  return ({
    method,
    path,
    adapters,
    ...rest
  }: RequiredTaggable<HttpRouteConfig>): HttpRoute => {
    const applicationService = declareApplicationService(defaults)(rest)

    return {
      ...applicationService,
      method,
      path,
      adapters: {
        requestAdapter:
          adapters?.requestAdapter ?? defaults.adapters.requestAdapter,
        responseAdapter:
          adapters?.responseAdapter ?? defaults.adapters.responseAdapter,
      },
      tag: rest.tag,
    }
  }
}
