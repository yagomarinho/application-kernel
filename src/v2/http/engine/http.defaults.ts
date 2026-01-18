/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ApplicationServiceDefaults,
  castApplicationServiceDefaults,
  identity,
} from '../../application.service'
import { HttpAdapters } from '../composition'

export interface HttpRouteDefaults extends ApplicationServiceDefaults {
  readonly adapters: HttpAdapters
}

export function castHttpRouteDefaults(
  defaults: Partial<HttpRouteDefaults> = {},
): HttpRouteDefaults {
  const serviceDefaults = castApplicationServiceDefaults(defaults)
  return {
    ...serviceDefaults,
    adapters: defaults.adapters ?? {
      requestAdapter: identity,
      responseAdapter: identity,
    },
  }
}
