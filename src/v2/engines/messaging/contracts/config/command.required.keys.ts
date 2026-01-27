/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  EventRequiredKeys,
  ExclusiveEventRequiredKeys,
} from './event.required.keys'

export type ExclusiveCommandRequiredKeys = ExclusiveEventRequiredKeys | 'emits'

export type CommandRequiredKeys =
  | ExclusiveCommandRequiredKeys
  | EventRequiredKeys
