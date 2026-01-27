/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithDefaults, WithRuntimeView } from '../../core'
import type { ServiceDefaults, ServiceEngine } from './contracts'

import {
  compileApplicationService,
  declareApplicationService,
  jobsApplicationService,
  runApplicationService,
} from './methods'
import { resolveServiceDefaults } from './resolvers'

interface Options
  extends WithRuntimeView, WithDefaults<Partial<ServiceDefaults>> {}

export function createServiceEngine({
  defaults,
  view,
}: Options): ServiceEngine {
  const resolvedDefaults = resolveServiceDefaults(defaults)
  return {
    declare: (config, options) =>
      declareApplicationService({
        defaults: options?.defaults ?? resolvedDefaults,
      })(config),

    compile: compileApplicationService({ view }),

    jobs: jobsApplicationService({ view }),

    run: runApplicationService({ view }),
  }
}
