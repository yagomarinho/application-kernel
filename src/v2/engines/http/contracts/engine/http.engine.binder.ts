/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EngineBinder } from '../../../../core'
import type { HttpURI } from '../../uri'
import type { HttpEngine } from './http.engine'

export type HttpEngineBinder = EngineBinder<HttpEngine, HttpURI>
