/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Compilation, ExtendedResult } from '../../../../core'
import type { CommandJob } from '../data'

export type CommandCompilation = Compilation<CommandJob, any, ExtendedResult>
