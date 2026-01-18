/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { WsEventHandlerConfig } from './ws.event.handler.config'
import type { EventHandler } from '../../messaging'
import type { WithAdapter } from '../composition'
import type { WsEngine, WsEngineBinder } from '../engine'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'

import { WshandlerURI } from '../uri'

export const WsEventHandlerURI = 'ws.event.handler'
export type WsEventHandlerURI = typeof WsEventHandlerURI

export interface WsEventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  Env = unknown,
>
  extends
    Omit<EventHandler<RawInput, GuardInput, Input, Output, Env>, 'tag'>,
    WithAdapter<RawInput>,
    Tag<WsEventHandlerURI> {}

export function WsEventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  Env = unknown,
>({
  on,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  incomingAdapter,
}: WsEventHandlerConfig<
  RawInput,
  GuardInput,
  Input,
  Output,
  Env
>): WsEngineBinder {
  const target = (engine: WsEngine) =>
    engine.mount({
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

  return applyEntry('resource', WshandlerURI)(target)
}
