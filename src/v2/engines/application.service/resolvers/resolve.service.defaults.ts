/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ServiceDefaults } from '../contracts'
import { doneDefault, EMPTY_ARRAY, identity } from '../constants'

export type ResolveServiceDefaults = Partial<ServiceDefaults>

export function resolveServiceDefaults({
  env = identity,
  guardian = doneDefault,
  middlewares = EMPTY_ARRAY,
  onError = identity,
  postprocessors = EMPTY_ARRAY,
}: ResolveServiceDefaults = {}): ServiceDefaults {
  return {
    env,
    guardian,
    middlewares,
    onError,
    postprocessors,
  }
}
