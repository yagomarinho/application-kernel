/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithRequiredKeys } from '@yagomarinho/ts-toolkit'
import type { HttpRoute } from '../http.route'
import type { RequiredKeys } from './required.keys'
import type { WithPartialAdapters } from '../capabilities'

interface HttpPreConfig
  extends Omit<HttpRoute, 'adapters'>, WithPartialAdapters {}

export type HttpConfig = WithRequiredKeys<HttpPreConfig, RequiredKeys>
