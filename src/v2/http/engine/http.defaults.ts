/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ApplicationServiceDefaults,
  resolveApplicationServiceDefaults,
  identity,
} from '../../application.service'
import { HttpAdapters } from '../composition'

export interface HttpRouteDefaults extends ApplicationServiceDefaults {
  readonly adapters: HttpAdapters
}

export function resolveHttpRouteDefaults({
  adapters = {
    requestAdapter: identity,
    responseAdapter: identity,
  },
  ...rest
}: Partial<HttpRouteDefaults> = {}): HttpRouteDefaults {
  const serviceDefaults = resolveApplicationServiceDefaults(rest)
  return {
    ...serviceDefaults,
    adapters,
  }
}
