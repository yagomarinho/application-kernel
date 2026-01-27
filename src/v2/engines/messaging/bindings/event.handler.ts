/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  EventConfig,
  MessagingEngine,
  MessagingEngineBinder,
} from '../contracts'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { EventHandlerURI, MessagingURI } from '../uri'

export function EventHandler({
  on,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: EventConfig): MessagingEngineBinder {
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
