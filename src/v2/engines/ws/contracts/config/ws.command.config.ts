/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Merge, WithRequiredKeys } from '@yagomarinho/ts-toolkit'
import { WsCommandRequiredKeys } from './keys'
import { WsCommandHandler } from '../bindings'
import { Messaging } from '../../../messaging'

type WsCommandPreConfig = Merge<
  WsCommandHandler,
  Messaging.WithEmits<string | Messaging.Emits<string>>
>

export type WsCommandConfig = WithRequiredKeys<
  WsCommandPreConfig,
  WsCommandRequiredKeys
>
