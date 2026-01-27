/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ApplicationPayload, Job } from '../../../core'
import type { WithApplicationView } from '../../../core/capabilities'

export interface RunApplicationService extends WithApplicationView {}

export function runApplicationService({ view }: RunApplicationService) {
  return (job: Job, payload: ApplicationPayload) => {
    const execution = view.jobs.resolve(job)
    return execution.execute(payload)
  }
}
