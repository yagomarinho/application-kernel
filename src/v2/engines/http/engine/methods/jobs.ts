/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { jobsApplicationService } from '../../../application.service'
import { Registry } from '../../../../environment'
import { HttpURI } from '../../uri'
import { HttpJob } from '../job'

interface JobsHttpRoute {
  registry: Registry
}

export function jobsHttpRoute({ registry }: JobsHttpRoute) {
  return (): HttpJob[] =>
    jobsApplicationService({ registry })(HttpURI) as HttpJob[]
}
