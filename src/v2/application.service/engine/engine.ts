/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tag } from '@yagomarinho/domain-kernel'
import { Engine, EngineBinder, Job } from '../../contracts'
import { ApplicationService } from '../application.service'
import {
  ApplicationServiceDefaults,
  resolveApplicationServiceDefaults,
} from './defaults'
import {
  compileApplicationService,
  declareApplicationService,
  jobsApplicationService,
  runApplicationService,
} from './methods'
import { WithGlobalEnvGetter, WithRegistry } from '../composition'

type RequiredKeys = 'handler'

export type ApplicationServiceConfig = Partial<
  Omit<ApplicationService, RequiredKeys>
> &
  Pick<ApplicationService, RequiredKeys> &
  Tag

export interface ApplicationServiceEngine extends Engine<
  ApplicationServiceConfig,
  ApplicationService,
  Job
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

export interface ApplicationServiceEngineOptions
  extends WithGlobalEnvGetter, WithRegistry {
  defaults?: Partial<ApplicationServiceDefaults>
}

export function ApplicationServiceEngine({
  defaults,
  registry,
  globalEnv,
}: ApplicationServiceEngineOptions): ApplicationServiceEngine {
  const ensureDefaults = resolveApplicationServiceDefaults(defaults)

  const declare: ApplicationServiceEngine['declare'] = (config, options) =>
    declareApplicationService(options?.defaults ?? ensureDefaults)(config)

  const compile: ApplicationServiceEngine['compile'] =
    compileApplicationService({ globalEnv })

  const run: ApplicationServiceEngine['run'] = runApplicationService({
    registry,
  })

  const jobs: ApplicationServiceEngine['jobs'] = jobsApplicationService({
    registry,
  })

  return {
    declare,
    compile,
    run,
    jobs,
  }
}
