/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { jobsApplicationService } from '../../../application.service'
import { Registry } from '../../../registry'
import { CommandhandlerURI, EventHandlerURI } from '../../uri'
import { MessagingJob } from '../job'

interface JobsMessagingHandler {
  registry: Registry
}

export function jobsMessagingHandler({ registry }: JobsMessagingHandler) {
  return (): MessagingJob[] =>
    jobsApplicationService({ registry })(CommandhandlerURI).concat(
      jobsApplicationService({ registry })(EventHandlerURI),
    ) as MessagingJob[]
}
