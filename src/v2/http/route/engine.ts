/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpRoute } from './route'
import { HttpRouteConfig } from './config'
import { Engine } from '../../contracts'

export interface HttpEngine extends Engine<HttpRouteConfig, HttpRoute> {}
