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
import { HttpRequest, HttpResponse } from '../ports'

export interface HttpEngine extends Engine<
  HttpRouteConfig,
  HttpRoute,
  HttpJob,
  HttpRequest,
  HttpResponse
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
  return {
    declare: declareHttpRoute({
      defaults: resolveHttpRouteDefaults(defaults),
      applicationServiceEngine,
    }),

    compile: compileHttpRoute({
      applicationServiceEngine,
      uid,
    }),

    jobs: jobsHttpRoute({ registry }),

    run: runHttpRoute({ registry }),
  }
}
