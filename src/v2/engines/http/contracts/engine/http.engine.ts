/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Engine } from '../../../../core'
import type { HttpConfig } from '../config'
import type { HttpRoute } from '../http.route'
import type { HttpCompilation } from '../meta'

export interface HttpEngine extends Engine<
  HttpConfig,
  HttpRoute,
  HttpCompilation
> {}
