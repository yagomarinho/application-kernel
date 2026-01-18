/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { DerivedAcceptIncoming, DerivedEndsEmits } from '../composition'
import type { ServiceBase } from '../../contracts'
import type { WsEngine, WsEngineBinder } from '../engine'
import type { WsMixedEventHandlerConfig } from './ws.mixed.event.handler.config'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'

import { WshandlerURI } from '../uri'

export const WsMixedEventHandlerURI = 'ws.mixed.event.handler'
export type WsMixedEventHandlerURI = typeof WsMixedEventHandlerURI

export interface WsMixedEventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  FinalOutput = Output,
  Env = unknown,
>
  extends
    ServiceBase<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    DerivedAcceptIncoming<RawInput>,
    DerivedEndsEmits,
    Tag<WsMixedEventHandlerURI> {}

export function WsMixedEventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  FinalOutput = Output,
  Env = unknown,
>({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: WsMixedEventHandlerConfig<
  RawInput,
  GuardInput,
  Input,
  Output,
  FinalOutput,
  Env
>): WsEngineBinder {
  const target = (engine: WsEngine) =>
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

  return applyEntry('resource', WshandlerURI)(target)
}
