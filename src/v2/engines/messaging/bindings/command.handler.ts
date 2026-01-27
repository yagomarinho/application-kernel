/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  CommandConfig,
  MessagingEngine,
  MessagingEngineBinder,
} from '../contracts'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { CommandhandlerURI, MessagingURI } from '../uri'

export function CommandHandler({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: CommandConfig): MessagingEngineBinder {
  const target = (engine: MessagingEngine) =>
    engine.declare({
      on,
      emits,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      tag: CommandhandlerURI,
    })

  return applyEntry('resource', MessagingURI)(target)
}
