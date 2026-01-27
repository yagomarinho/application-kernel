/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CommandJob } from './command.job'
import type { EventJob } from './event.job'

export type MessagingJob = EventJob | CommandJob
