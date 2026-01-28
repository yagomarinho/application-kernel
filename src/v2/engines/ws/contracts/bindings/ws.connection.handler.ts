/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'
import type { ApplicationService } from '../../../application.service'
import type { Http } from '../../../http'
import type {
  WithHandlers,
  WithWsIncomingAdapter,
  WithOnConnection,
} from '../capabilities'
import type { WsConnectionURI } from '../../uri'

export interface WsRouteConnection
  extends
    Pick<
      ApplicationService.ApplicationService,
      'env' | 'middlewares' | 'postprocessors' | 'onError'
    >,
    Http.WithPath,
    WithOnConnection,
    WithHandlers,
    WithWsIncomingAdapter,
    Tag<WsConnectionURI> {}
