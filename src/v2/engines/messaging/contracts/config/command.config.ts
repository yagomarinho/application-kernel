/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Merge, WithRequiredKeys } from '@yagomarinho/ts-toolkit'
import type { CommandHandler } from '../command.handler'
import type { CommandRequiredKeys } from './command.required.keys'
import type { Emits } from '../meta'
import type { WithEmits } from '../capabilities'

type CommandPreConfig = Merge<CommandHandler, WithEmits<string | Emits<string>>>

export type CommandConfig = WithRequiredKeys<
  CommandPreConfig,
  CommandRequiredKeys
>
