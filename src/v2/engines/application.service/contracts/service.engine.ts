/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Engine, ExtendedResult, Job } from '../../../core'
import { ApplicationService } from './application.service'
import { ServiceConfig } from './service.config'
import { ServiceDefaults } from './service.defaults'

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
