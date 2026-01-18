/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { WsRouteConnectionConfig } from './ws.route.connection.config'
import type { WsEngine, WsEngineBinder } from '../engine'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { WshandlerURI } from '../uri'

export const WsRouteConnectionURI = 'ws.route.connection'
export type WsRouteConnectionURI = typeof WsRouteConnectionURI

export interface WsRouteConnection<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  FinalOutput = Output,
  Env = unknown,
> extends Tag<WsRouteConnectionURI> {}

export function WsRouteConnection<
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
}: WsRouteConnectionConfig<
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
      tag: WsRouteConnectionURI,
    })

  return applyEntry('resource', WshandlerURI)(target)
}
