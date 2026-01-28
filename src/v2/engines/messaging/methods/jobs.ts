/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithApplicationView } from '../../../core'
import type { MessagingJob } from '../contracts'

import { jobsApplicationService } from '../../application.service'
import { MessagingURI } from '../uri'

export interface JobsMessagingHandler extends WithApplicationView {}

export function jobsMessagingHandler({ view }: JobsMessagingHandler) {
  return (): MessagingJob[] =>
    jobsApplicationService({ view })(MessagingURI) as MessagingJob[]
}
