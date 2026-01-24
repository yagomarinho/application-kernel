/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ApplicationServiceEngine } from '../../../application.service'
import type { RequiredTaggable } from '../../../contracts'
import type { HttpRoute, HttpRouteConfig } from '../../route'
import type { HttpRouteDefaults } from '../defaults'

interface DeclareHttpRoute {
  defaults: HttpRouteDefaults
  applicationServiceEngine: ApplicationServiceEngine
}

export function declareHttpRoute({
  defaults,
  applicationServiceEngine,
}: DeclareHttpRoute) {
  return ({
    method,
    path,
    adapters,
    ...rest
  }: RequiredTaggable<HttpRouteConfig>): HttpRoute => {
    const applicationService = applicationServiceEngine.declare(rest, {
      defaults,
    })

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
