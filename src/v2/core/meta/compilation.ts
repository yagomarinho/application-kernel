/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../data'
import type { WithExecution, WithJob } from '../capabilities'

export interface Compilation<J extends Job = Job, In = any, Out = any>
  extends WithJob<J>, WithExecution<In, Out> {}
