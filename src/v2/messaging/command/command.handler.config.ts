/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CommandHandler } from './command.handler'

type RequiredKeys = 'on' | 'emits' | 'handler'

export type CommandHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
> = Partial<
  Omit<
    CommandHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
> &
  Pick<
    CommandHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
