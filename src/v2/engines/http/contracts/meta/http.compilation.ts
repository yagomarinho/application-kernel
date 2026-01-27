/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Compilation } from '../../../../core'
import type { HttpJob } from '../data'
import type { HttpRequest, HttpResponse } from '../ports'

export type HttpCompilation = Compilation<HttpJob, HttpRequest, HttpResponse>
