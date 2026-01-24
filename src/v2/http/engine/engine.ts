/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpRoute, HttpRouteConfig } from '../route'
import type { UID } from '../../uid'
import type { Engine, EngineBinder } from '../../contracts'
import type { HttpJob } from './job'
import type { Registry } from '../../registry'
import type { ApplicationServiceEngine } from '../../application.service'

import { resolveHttpRouteDefaults, HttpRouteDefaults } from './defaults'
import {
  declareHttpRoute,
  compileHttpRoute,
  jobsHttpRoute,
  runHttpRoute,
} from './methods'
import { HttpURI } from '../uri'

export interface HttpEngine extends Engine<
  HttpRouteConfig,
  HttpRoute,
  HttpJob
> {}

export type HttpEngineBinder = EngineBinder<HttpEngine, HttpURI>

export interface HttpEngineOptions {
  defaults?: Partial<HttpRouteDefaults>
  applicationServiceEngine: ApplicationServiceEngine
  uid: UID
  registry: Registry
}

export function HttpEngine({
  defaults,
  applicationServiceEngine,
  uid,
  registry,
}: HttpEngineOptions): HttpEngine {
  const ensureDefaults = resolveHttpRouteDefaults(defaults)

  const declare: HttpEngine['declare'] = declareHttpRoute({
    defaults: ensureDefaults,
    applicationServiceEngine,
  })

  const compile: HttpEngine['compile'] = compileHttpRoute({
    applicationServiceEngine,
    uid,
  })

  const run: HttpEngine['run'] = runHttpRoute({ registry })

  const jobs: HttpEngine['jobs'] = jobsHttpRoute({ registry })

  return {
    declare,
    compile,
    run,
    jobs,
  }
}
