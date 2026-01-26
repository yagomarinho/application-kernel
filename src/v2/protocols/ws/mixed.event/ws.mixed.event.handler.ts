/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type {
  AcceptEmitterIncoming,
  AcceptWsIncoming,
  EmitsEmitterOutput,
  EmitsWsOutput,
} from '../composition'
import type { WsHandlersEngine, WsHandlersEngineBinder } from '../engines'
import type { WsMixedEventHandlerConfig } from './ws.mixed.event.handler.config'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'

import { WsMixedEventHandlerURI, WsURI } from '../uri'
import { ApplicationService } from '../../../core/application.service'

export interface WsIncomingEmitterOut
  extends ApplicationService, Tag<WsMixedEventHandlerURI> {
  on: AcceptWsIncoming
  emits: EmitsEmitterOutput
}

export interface EmitterIncomingWsOut
  extends ApplicationService, Tag<WsMixedEventHandlerURI> {
  on: AcceptEmitterIncoming
  emits: EmitsWsOutput
}

export type WsMixedEventHandler = WsIncomingEmitterOut | EmitterIncomingWsOut

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
  // O correto a se fazer é uma validação antes de empurrar para o engine
  // fica como próxima tarefa
  const target = (engine: WsHandlersEngine) =>
    engine.declare({
      on,
      emits,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      tag: WsMixedEventHandlerURI,
    } as any)

  return applyEntry('resource', WsURI)(target)
}
