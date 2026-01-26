/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationService } from '../../application.service'
import { ApplicationServiceDefaults } from '../defaults'
import { ApplicationServiceConfig } from '../engine'

interface DeclareApplicationService {
  defaults: ApplicationServiceDefaults
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
  }: ApplicationServiceConfig): ApplicationService => ({
    env,
    middlewares,
    guardian,
    handler,
    postprocessors,
    onError,
  })
}
