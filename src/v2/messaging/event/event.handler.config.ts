/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EventHandler } from './event.handler'

type RequiredKeys = 'on' | 'handler'

export type EventHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  Env = any,
> = Partial<
  Omit<EventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
> &
  Pick<EventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
