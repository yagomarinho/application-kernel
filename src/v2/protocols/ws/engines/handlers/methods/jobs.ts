/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { jobsApplicationService } from '../../../../../core/application.service'
import { WsRegistry } from '../../../../../core/environment'
import { WsHandlersURI } from '../../../uri'
import { WsHandlersJob } from '../jobs'

interface JobsWsHandlers {
  registry: WsRegistry
}

export function jobsWsHandlers({ registry }: JobsWsHandlers) {
  return (): WsHandlersJob[] =>
    jobsApplicationService({ registry })(WsHandlersURI) as WsHandlersJob[]
}
