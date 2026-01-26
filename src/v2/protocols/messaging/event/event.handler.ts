/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { EventHandlerConfig } from './event.handler.config'
import type { MessagingEngineBinder, MessagingEngine } from '../engine'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { EventHandlerURI, MessagingURI } from '../uri'
import { ApplicationService } from '../../../core/application.service'

export interface EventHandler extends ApplicationService, Tag<EventHandlerURI> {
  /**
   * Identifies the Command this handler consumes.
   *
   * - Semantic identifier only (string)
   * - Strongly typed payload at compile-time
   * - Used for routing and contract definition
   */
  on: string
}

export function EventHandler({
  on,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: EventHandlerConfig): MessagingEngineBinder {
  const target = (engine: MessagingEngine) =>
    engine.declare({
      on,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      tag: EventHandlerURI,
    })

  return applyEntry('resource', MessagingURI)(target)
}
