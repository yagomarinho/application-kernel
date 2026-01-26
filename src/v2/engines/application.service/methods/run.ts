/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationPayload, Job } from '../../../core'
import { composeCapabilities, globalCapabilities } from '../../../environment'
import { WithEnvironment } from '../../../core/capabilities'

export interface RunApplicationService extends WithEnvironment {}

export function runApplicationService({ environment }: RunApplicationService) {
  const registry = composeCapabilities(environment, globalCapabilities)

  return (job: Job, payload: ApplicationPayload) => {
    const execution = registry.jobs.resolve(job)
    return execution.execute(payload)
  }
}
