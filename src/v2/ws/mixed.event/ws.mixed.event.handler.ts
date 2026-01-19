/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { DerivedAcceptIncoming, DerivedEndsEmits } from '../composition'
import type { WsHandlersEngine, WsHandlersEngineBinder } from '../engine'
import type { WsMixedEventHandlerConfig } from './ws.mixed.event.handler.config'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'

import { WsMixedEventHandlerURI, WsURI } from '../uri'
import { ApplicationService } from '../../application.service'

export interface WsMixedEventHandler
  extends
    ApplicationService,
    DerivedAcceptIncoming,
    DerivedEndsEmits,
    Tag<WsMixedEventHandlerURI> {}

export function WsMixedEventHandler({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: WsMixedEventHandlerConfig): WsHandlersEngineBinder {
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
      tag: WsMixedEventHandlerURI,
    })

  return applyEntry('resource', WsURI)(target)
}
