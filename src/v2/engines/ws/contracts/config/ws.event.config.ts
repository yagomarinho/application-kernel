/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithRequiredKeys } from '@yagomarinho/ts-toolkit'
import type { WsEventHandler } from '../bindings'
import type { WsEventRequiredKeys } from './keys'

export type WsEventConfig = WithRequiredKeys<
  WsEventHandler,
  WsEventRequiredKeys
>
