/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Engine, ExtendedResult, Job } from '../../../../core'
import type { ApplicationService } from '../application.service'
import type { ServiceConfig, ServiceDefaults } from '../config'

export interface ServiceEngine extends Engine<
  ServiceConfig,
  ApplicationService,
  Job,
  any,
  ExtendedResult
> {
  declare: (
    config: ServiceConfig,
    options?: { defaults: ServiceDefaults },
  ) => ApplicationService

  jobs: (tag?: string) => ReadonlyArray<Job>
}
