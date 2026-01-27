/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Merge, WithRequiredKeys } from '@yagomarinho/ts-toolkit'
import type { HttpRoute } from '../http.route'
import type { HttpRequiredKeys } from './http.required.keys'
import type { WithPartialAdapters } from '../capabilities'

type HttpPreConfig = Merge<HttpRoute, WithPartialAdapters>

export type HttpConfig = WithRequiredKeys<HttpPreConfig, HttpRequiredKeys>
