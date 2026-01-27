/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Compilation, Engine, ExtendedResult, Job } from '../../../../core'
import type { ApplicationService } from '../application.service'
import type { ServiceConfig, ServiceDefaults } from '../config'

export type ServiceCompilation = Compilation<Job, any, ExtendedResult>

export interface ServiceEngine extends Engine<
  ServiceConfig,
  ApplicationService,
  ServiceCompilation
> {
  declare: (
    config: ServiceConfig,
    options?: { defaults: ServiceDefaults },
  ) => ApplicationService

  jobs: (tag?: string) => Job[]
}
