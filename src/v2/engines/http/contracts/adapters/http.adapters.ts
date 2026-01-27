/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequestAdapter } from './request.adapter'
import type { ResponseAdapter } from './response.adapter'

export interface HttpAdapters {
  requestAdapter: RequestAdapter
  responseAdapter: ResponseAdapter
}
