/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtendedFailure } from './extended.result'
import type { ApplicationContext } from './application.context'

import { Failure } from '@yagomarinho/domain-kernel'
import { concatenate } from '@yagomarinho/smooth/concatenate'

export function AppError(
  error: any,
  context: ApplicationContext = {},
  handled: boolean = false,
): ExtendedFailure {
  return concatenate(Failure(error), { context, handled })
}

AppError.handle = (error: any, context?: ApplicationContext) =>
  AppError(error, context, true)

AppError.unhandle = (error: any, context?: ApplicationContext) =>
  AppError(error, context)
