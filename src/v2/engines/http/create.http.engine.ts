/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  WithApplicationView,
  WithPartialDefaults,
  WithUID,
} from '../../core'
import type { WithServiceEngine } from '../__contracts__'
import type { HttpDefaults, HttpEngine } from './contracts'

import {
  compileHttpRoute,
  declareHttpRoute,
  jobsHttpRoute,
  runHttpRoute,
} from './methods'
import { resolveHttpDefaults } from './resolvers'

interface Options
  extends
    WithPartialDefaults<HttpDefaults>,
    WithServiceEngine,
    WithApplicationView,
    WithUID {}

export function createHttpEngine({
  defaults,
  serviceEngine,
  uid,
  view,
}: Options): HttpEngine {
  return {
    declare: declareHttpRoute({
      defaults: resolveHttpDefaults(defaults),
      serviceEngine,
    }),

    compile: compileHttpRoute({
      serviceEngine,
      uid,
    }),

    jobs: jobsHttpRoute({ view }),

    run: runHttpRoute({ view }),
  }
}
