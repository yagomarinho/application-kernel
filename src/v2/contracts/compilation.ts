/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Execution } from './execution'
import type { Job } from './job'

export interface Compilation<J extends Job = Job, In = any, Out = any> {
  job: J
  execution: Execution<In, Out>
}
