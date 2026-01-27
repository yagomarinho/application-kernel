/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { ApplicationService } from '../../application.service'
import type { WithHttpAdapters, WithHttpMethod, WithPath } from '../contracts'
import type { HttpRouteURI } from '../uri'

export interface HttpRoute
  extends
    ApplicationService,
    WithHttpMethod,
    WithPath,
    WithHttpAdapters,
    Tag<HttpRouteURI> {}
