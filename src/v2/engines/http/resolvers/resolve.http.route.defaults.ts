/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpDefaults } from '../contracts'

import { identity, resolveServiceDefaults } from '../../application.service'
import { responseAdapter } from '../constants'

export function resolveHttpRouteDefaults({
  adapters = {
    requestAdapter: identity,
    responseAdapter,
  },
  ...rest
}: Partial<HttpDefaults> = {}): HttpDefaults {
  const serviceDefaults = resolveServiceDefaults(rest)
  return {
    ...serviceDefaults,
    adapters,
  }
}
