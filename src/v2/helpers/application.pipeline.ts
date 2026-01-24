/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ExecutionContext,
  Failure,
  isFailure,
  Resolvable,
  Result,
  Successful,
  UseCase,
} from '@yagomarinho/domain-kernel'
import { concatenate } from '@yagomarinho/utils-toolkit'

import {
  ErrorHandler,
  ExtendedFailure,
  ExtendedMiddleware,
  ExtendedPostProcessor,
  Guardian,
  MiddlewareResult,
  Next,
} from '../contracts'

import { mapResolvable } from './map.resolvable'
import { byPassFailure, NonFailure } from './by.pass.failure'

export interface ExtendedSuccessful extends Successful {
  ctx: ExecutionContext
}

function bind<A, B>(
  resolvable: Resolvable<A>,
  fn: (value: NonFailure<A>) => B,
) {
  return mapResolvable(resolvable, byPassFailure(fn))
}

type Step = (input: any, env: any, ctx: ExecutionContext) => Resolvable<Result>

function step(resolvable: Resolvable<MiddlewareResult>, step: Step, env: any) {
  return bind(resolvable, next =>
    bind(step(next.data, env, next.ctx), result => Next(result.data, next.ctx)),
  )
}

function mapToStep(fn: Step, env: any) {
  return (resolvable: Resolvable<MiddlewareResult>) => step(resolvable, fn, env)
}

function pipe(...fns: ((arg: any) => any)[]) {
  return (value: any) => fns.reduce((output, fn) => fn(output), value)
}

export function applicationPipeline(
  middleware: ExtendedMiddleware,
  guardian: Guardian,
  handler: UseCase,
  postprocessor: ExtendedPostProcessor,
  onError: ErrorHandler,
) {
  return (input: any, env: any, ctx: any) => {
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
