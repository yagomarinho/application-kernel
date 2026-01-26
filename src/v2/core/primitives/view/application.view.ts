/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../../data'
import type { Compilation } from '../../meta'
import type { Execution } from '../../pipeline'

export interface ApplicationView {
  compilation: {
    attach: (compilation: Compilation) => void
  }

  jobs: {
    list: (tag?: string) => ReadonlyArray<Job>
    has: (job: Job) => boolean
    resolve: (job: Job) => Execution
  }
}
