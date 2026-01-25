/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Compilation, Execution, Job } from '../contracts'

export interface Registry {
  compilation: {
    attach: (compilation: Compilation) => void
  }

  jobs: {
    list: (tag?: string) => ReadonlyArray<Job>
    resolve: (job: Job) => Execution
  }
}
