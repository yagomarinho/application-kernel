/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Successful } from '@yagomarinho/domain-kernel'
import type {
  EnvHandler,
  ErrorHandler,
  Guardian,
  Middleware,
  Postprocessor,
} from '../contracts'

export interface ApplicationServiceDefaults {
  readonly env: EnvHandler
  readonly middlewares: Middleware[]
  readonly guardian: Guardian
  readonly postprocessors: Postprocessor[]
  readonly onError: ErrorHandler
}

export const EMPTY_ARRAY: any[] = []

export function identity<A>(value: A): A {
  return value
}

export function defaultGuardian<A>(input: A): Successful<A> {
  return Successful(input)
}

export function castApplicationServiceDefaults({
  env = identity,
  guardian = defaultGuardian,
  middlewares = EMPTY_ARRAY,
  onError = identity,
  postprocessors = EMPTY_ARRAY,
}: Partial<ApplicationServiceDefaults> = {}): ApplicationServiceDefaults {
  return {
    env,
    guardian,
    middlewares,
    onError,
    postprocessors,
  }
}
