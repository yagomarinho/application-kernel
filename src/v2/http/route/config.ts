/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpRequest } from '../request'
import { HttpRoute } from './route'

export type RequiredKeys = 'method' | 'path' | 'handler'

export type HttpRouteConfig<
  RawInput = HttpRequest,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
> = Partial<
  Omit<
    HttpRoute<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
> &
  Pick<
    HttpRoute<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
