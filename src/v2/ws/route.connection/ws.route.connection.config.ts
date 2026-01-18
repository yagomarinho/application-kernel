/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsRouteConnection } from './ws.route.connection'

type RequiredKeys = 'on' | 'emits' | 'handler'

export type WsRouteConnectionConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
> = Partial<
  Omit<
    WsRouteConnection<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
> &
  Pick<
    WsRouteConnection<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
