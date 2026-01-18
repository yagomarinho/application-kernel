/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpRoute } from './route'

export type RequiredKeys = 'method' | 'path' | 'handler'

export type HttpRouteConfig = Partial<Omit<HttpRoute, RequiredKeys>> &
  Pick<HttpRoute, RequiredKeys>
