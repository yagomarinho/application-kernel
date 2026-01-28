/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
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
  type ExtendedResult,
  type ExtendedSuccessful,
  Next,
  AppError,
} from '../../../core'
import { bind, failureBoundary, mapResolvable } from '../../../shared'

type Step = (
  input: any,
  env: any,
  context: ExecutionContext,
) => Resolvable<Result>

function step(resolvable: Resolvable<MiddlewareResult>, step: Step, env: any) {
  return bind(resolvable, next =>
    bind(step(next.data, env, (next as any).context), result =>
      Next(result.data, next.context),
    ),
  )
}

function mapToStep(fn: Step, env: any) {
  return (resolvable: Resolvable<MiddlewareResult>) => step(resolvable, fn, env)
}

function handleError(context: any) {
  return (error: any) =>
    isFailure(error)
      ? AppError(
          error.error,
          Object.keys((error as any).context).length
            ? (error as any).context
            : context,
          (error as any).handled ?? false,
        )
      : AppError.unhandle(error, context)
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
            handleError(output.context),
          )

        return bind(afterMiddleware, next =>
          mapResolvable(
            safeOnError(output.error, env, next.context),
            handleError(next.context),
          ),
        )
      }

      return concatenate(Successful(output.data), {
        context: output.context,
      }) as ExtendedSuccessful
    })
  }
}
