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
} from '../../core'

import { mapResolvable } from './map.resolvable'
import { bind } from './bind'

type Step = (input: any, env: any, ctx: ExecutionContext) => Resolvable<Result>

function step(resolvable: Resolvable<MiddlewareResult>, step: Step, env: any) {
  return bind(resolvable, next =>
    bind(step(next.data, env, next.ctx), result => Next(result.data, next.ctx)),
  )
}

function mapToStep(fn: Step, env: any) {
  return (resolvable: Resolvable<MiddlewareResult>) => step(resolvable, fn, env)
}

export function applicationPipeline(
  middleware: ExtendedMiddleware,
  guardian: Guardian,
  handler: UseCase,
  postprocessor: ExtendedPostProcessor,
  onError: ErrorHandler,
) {
  return (input: any, env: any, ctx: any): Resolvable<ExtendedResult> => {
    const afterMiddleware = middleware(input, env, ctx)

    const afterCalculation = pipe(
      mapToStep(guardian, env),
      mapToStep(handler, env),
      mapToStep(postprocessor, env),
    )(afterMiddleware)

    return mapResolvable(afterCalculation, output => {
      if (isFailure(output)) {
        if ('ctx' in output)
          return mapResolvable(
            onError(output.error, env, output.ctx as any),
            error =>
              concatenate(Failure(error), {
                ctx: output.ctx,
              }) as ExtendedFailure,
          )

        return bind(afterMiddleware, next =>
          mapResolvable(
            onError(output.error, env, next.ctx),
            error =>
              concatenate(Failure(error), { ctx: next.ctx }) as ExtendedFailure,
          ),
        )
      }

      return concatenate(Successful(output.data), {
        ctx: output.ctx,
      }) as ExtendedSuccessful
    })
  }
}
