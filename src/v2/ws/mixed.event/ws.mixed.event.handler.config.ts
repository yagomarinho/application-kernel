/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsMixedEventHandler } from './ws.mixed.event.handler'

type RequiredKeys = 'on' | 'emits' | 'handler'

export type WsMixedEventHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
> = Partial<
  Omit<
    WsMixedEventHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
> &
  Pick<
    WsMixedEventHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
