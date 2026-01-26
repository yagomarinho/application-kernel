/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ServiceConfig, ServiceDefaults } from '../contracts'
import { ApplicationService } from '../contracts/application.service'

interface DeclareApplicationService {
  defaults: ServiceDefaults
}

export function declareApplicationService({
  defaults,
}: DeclareApplicationService) {
  return ({
    env = defaults.env,
    middlewares = defaults.middlewares,
    guardian = defaults.guardian,
    handler,
    postprocessors = defaults.postprocessors,
    onError = defaults.onError,
  }: ServiceConfig): ApplicationService => ({
    env,
    middlewares,
    guardian,
    handler,
    postprocessors,
    onError,
  })
}
