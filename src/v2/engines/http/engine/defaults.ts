/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isFailure, Result } from '@yagomarinho/domain-kernel'
import {
  ServiceDefaults,
  resolveServiceDefaults,
  identity,
} from '../../application.service'
import { HttpAdapters } from '../composition'
import { HttpResponse } from '../ports'

function responseAdapterDefault(result: Result): HttpResponse {
  return isFailure(result)
    ? { status: 500, body: result.error, headers: {} }
    : { status: 200, body: result.data, headers: {} }
}

export interface HttpRouteDefaults extends ServiceDefaults {
  readonly adapters: HttpAdapters
}

export function resolveHttpRouteDefaults({
  adapters = {
    requestAdapter: identity,
    responseAdapter: responseAdapterDefault,
  },
  ...rest
}: Partial<HttpRouteDefaults> = {}): HttpRouteDefaults {
  const serviceDefaults = resolveServiceDefaults(rest)
  return {
    ...serviceDefaults,
    adapters,
  }
}
