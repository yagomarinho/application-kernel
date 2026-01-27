/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Failure,
  isFailure,
  Successful,
  type ExecutionContext,
  type Resolvable,
  type Result,
  type UseCase,
} from '@yagomarinho/domain-kernel'

import { concatenate } from '@yagomarinho/utils-toolkit/concatenate'
import { pipe } from '@yagomarinho/smooth/pipe'

import {
  type ErrorHandler,
  type ExtendedMiddleware,
  type ExtendedPostProcessor,
  type Guardian,
  type MiddlewareResult,
  type ExtendedFailure,
  type ExtendedResult,
  type ExtendedSuccessful,
  Next,
} from '../../../core'
import { bind, failureBoundary, mapResolvable } from '../../../shared'

type Step = (
  input: any,
  env: any,
  context: ExecutionContext,
) => Resolvable<Result>

function step(resolvable: Resolvable<MiddlewareResult>, step: Step, env: any) {
  return bind(resolvable, next =>
    bind(step(next.data, env, next.context), result =>
      Next(result.data, next.context),
    ),
  )
}

function mapToStep(fn: Step, env: any) {
  return (resolvable: Resolvable<MiddlewareResult>) => step(resolvable, fn, env)
}

export function resolveServicePipeline(
  middleware: ExtendedMiddleware,
  guardian: Guardian,
  handler: UseCase,
  postprocessor: ExtendedPostProcessor,
  onError: ErrorHandler,
) {
  return (input: any, env: any, context: any): Resolvable<ExtendedResult> => {
    const afterMiddleware = middleware(input, env, context)

    const afterCalculation = pipe(
      mapToStep(failureBoundary(guardian), env),
      mapToStep(failureBoundary(handler), env),
      mapToStep(failureBoundary(postprocessor), env),
    )(afterMiddleware)

    return mapResolvable(afterCalculation, output => {
      if (isFailure(output)) {
        const safeOnError = failureBoundary(onError)
        if ('context' in output)
          return mapResolvable(
            safeOnError(output.error, env, output.context as any),
            error =>
              concatenate(Failure(error), {
                context: output.context,
              }) as ExtendedFailure,
          )

        return bind(afterMiddleware, next =>
          mapResolvable(
            safeOnError(output.error, env, next.context),
            error =>
              concatenate(Failure(error), {
                context: next.context,
              }) as ExtendedFailure,
          ),
        )
      }

      return concatenate(Successful(output.data), {
        context: output.context,
      }) as ExtendedSuccessful
    })
  }
}
