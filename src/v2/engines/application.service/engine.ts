/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { WithEnvironment } from '../../core/capabilities'
import type { Engine, EngineBinder, ExtendedResult, Job } from '../../core'
import type { ApplicationService } from '../../core/application/application.service'

import {
  type ApplicationServiceDefaults,
  resolveApplicationServiceDefaults,
} from '../../core/application/application.defaults'
import {
  compileApplicationService,
  declareApplicationService,
  jobsApplicationService,
  runApplicationService,
} from './methods'

type RequiredKeys = 'handler'

export type ApplicationServiceConfig = Partial<
  Omit<ApplicationService, RequiredKeys>
> &
  Pick<ApplicationService, RequiredKeys> &
  Tag

export interface ApplicationServiceEngine extends Engine<
  ApplicationServiceConfig,
  ApplicationService,
  Job,
  any,
  ExtendedResult
> {
  declare: (
    config: ApplicationServiceConfig,
    options?: { defaults: ApplicationServiceDefaults },
  ) => ApplicationService

  jobs: (tag?: string) => ReadonlyArray<Job>
}

export type ApplicationServiceEngineBinder = EngineBinder<
  ApplicationServiceEngine,
  string
>

export interface ApplicationServiceEngineOptions extends WithEnvironment {
  defaults?: Partial<ApplicationServiceDefaults>
}

export function ApplicationServiceEngine({
  defaults,
  environment,
}: ApplicationServiceEngineOptions): ApplicationServiceEngine {
  return {
    declare: (config, options) =>
      declareApplicationService({
        defaults:
          options?.defaults ?? resolveApplicationServiceDefaults(defaults),
      })(config),

    compile: compileApplicationService({ environment }),

    jobs: jobsApplicationService({ environment }),

    run: runApplicationService({ environment }),
  }
}
