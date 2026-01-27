/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CommandCompilation } from './command.compilation'
import type { EventCompilation } from './event.compilation'

export type MessagingCompilation = CommandCompilation | EventCompilation
