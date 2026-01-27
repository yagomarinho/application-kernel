/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpConfig, HttpDefaults } from '../contracts'

export interface ResolveHttpAdapters {
  declaration: Pick<HttpConfig, 'adapters'>
  defaults: HttpDefaults
}

export function resolveHttpAdapters({
  declaration: { adapters },
  defaults,
}: ResolveHttpAdapters) {
  return {
    requestAdapter:
      adapters?.requestAdapter ?? defaults.adapters.requestAdapter,
    responseAdapter:
      adapters?.responseAdapter ?? defaults.adapters.responseAdapter,
  }
}
