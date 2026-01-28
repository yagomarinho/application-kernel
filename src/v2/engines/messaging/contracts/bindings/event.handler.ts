/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'
import type { ApplicationService } from '../../../application.service'
import type { WithOn } from '../capabilities'

import type { EventHandlerURI } from '../../uri'

export interface EventHandler
  extends
    ApplicationService.ApplicationService,
    WithOn<string>,
    Tag<EventHandlerURI> {}
