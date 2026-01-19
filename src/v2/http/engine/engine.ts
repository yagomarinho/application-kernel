/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpRoute, HttpRouteConfig } from '../route'
import type { Engine, EngineBinder } from '../../contracts'
import type { HttpURI } from '../uri'

import { mountHttpRoute } from './mount'
import { resolveHttpRouteDefaults, HttpRouteDefaults } from './http.defaults'

export interface HttpEngine extends Engine<HttpRouteConfig, HttpRoute> {}

export type HttpEngineBinder = EngineBinder<HttpEngine, HttpURI>

export interface HttpEngineOptions {
  defaults?: Partial<HttpRouteDefaults>
}

export function HttpEngine({ defaults }: HttpEngineOptions = {}): HttpEngine {
  const ensureDefaults = resolveHttpRouteDefaults(defaults)

  const mount: HttpEngine['mount'] = mountHttpRoute(ensureDefaults)

  return {
    mount,
  }
}
