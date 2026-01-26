/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../../../core'
import type { WithHttpMethod, WithPath } from '../composition'
import type { HttpURI } from '../uri'

export interface HttpJob extends Job<HttpURI>, WithHttpMethod, WithPath {}
