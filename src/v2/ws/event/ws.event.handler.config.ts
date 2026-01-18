/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsEventHandler } from './ws.event.handler'

type RequiredKeys = 'on' | 'handler'

export type WsEventHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  Env = any,
> = Partial<
  Omit<WsEventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
> &
  Pick<WsEventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
