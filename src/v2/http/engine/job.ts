/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../../contracts'
import type { HttpMethod } from '../ports'
import type { HttpURI } from '../uri'

export interface HttpJob extends Job<HttpURI> {
  path: string
  method: HttpMethod
}
