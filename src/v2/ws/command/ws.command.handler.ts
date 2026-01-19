/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { CommandHandler } from '../../messaging'
import type { WithWsAdapter } from '../composition'
import type { WsHandlersEngine, WsHandlersEngineBinder } from '../engine'
import type { WsCommandHandlerConfig } from './ws.command.handler.config'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'

import { WsCommandHandlerURI, WsURI } from '../uri'

export interface WsCommandHandler
  extends
    Omit<CommandHandler, 'tag'>,
    WithWsAdapter,
    Tag<WsCommandHandlerURI> {}

export function WsCommandHandler({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  incomingAdapter,
}: WsCommandHandlerConfig): WsHandlersEngineBinder {
  const target = (engine: WsHandlersEngine) =>
    engine.mount({
      on,
      emits,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      incomingAdapter,
      tag: WsCommandHandlerURI,
    })

  return applyEntry('resource', WsURI)(target)
}
