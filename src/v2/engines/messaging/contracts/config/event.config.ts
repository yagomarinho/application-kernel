/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithRequiredKeys } from '@yagomarinho/ts-toolkit'
import type { EventRequiredKeys } from './event.required.keys'
import type { EventHandler } from '../bindings/event.handler'

export type EventConfig = WithRequiredKeys<EventHandler, EventRequiredKeys>
