/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { WsEventHandlerConfig } from './ws.event.handler.config'
import type { EventHandler } from '../../messaging'
import type { WithWsAdapter } from '../composition'
import type { WsHandlersEngine, WsHandlersEngineBinder } from '../engines'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'

import { WsEventHandlerURI, WsURI } from '../uri'

export interface WsEventHandler
  extends Omit<EventHandler, 'tag'>, WithWsAdapter, Tag<WsEventHandlerURI> {}

export function WsEventHandler({
  on,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  incomingAdapter,
}: WsEventHandlerConfig): WsHandlersEngineBinder {
  const target = (engine: WsHandlersEngine) =>
    engine.declare({
      on,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      incomingAdapter,
      tag: WsEventHandlerURI,
    })

  return applyEntry('resource', WsURI)(target)
}
