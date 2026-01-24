/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationPayload, Job } from '../../../contracts'
import { WithRegistry } from '../../composition'

export interface RunApplicationService extends WithRegistry {}

export function runApplicationService({ registry }: RunApplicationService) {
  return (job: Job, payload: ApplicationPayload) => {
    const execution = registry.resolve(job)
    return execution.execute(payload)
  }
}
