/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Compilation, Execution, Job } from '../contracts'

export interface Registry {
  listJobs: (tag?: string) => ReadonlyArray<Job>
  attach: (compilation: Compilation) => void
  resolve: (job: Job) => Execution
}
