/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtendedResult } from '../../contracts'
import type { HttpRequest, HttpResponse } from '../ports'

export interface HttpAdapters {
  requestAdapter: (request: HttpRequest) => any
  responseAdapter: (data: ExtendedResult) => HttpResponse
}

export interface WithHttpAdapters {
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
  adapters: HttpAdapters
}
