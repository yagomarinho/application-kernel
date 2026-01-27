/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithApplicationView } from '../../../core'
import type { HttpJob } from '../contracts'

import { jobsApplicationService } from '../../application.service'
import { HttpURI } from '../uri'

interface JobsHttpRoute extends WithApplicationView {}

export function jobsHttpRoute({ view }: JobsHttpRoute) {
  return (): HttpJob[] => jobsApplicationService({ view })(HttpURI) as HttpJob[]
}
