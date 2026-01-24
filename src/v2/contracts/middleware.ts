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
  Tag,
} from '@yagomarinho/domain-kernel'
import { mapResolvable, Pointer } from '../helpers'

export const NextURI = 'next'
export type NextURI = typeof NextURI

export interface Next<Data = any> extends Tag<NextURI> {
  data: Data
  ctx: ExecutionContext
}

export type MiddlewareResult<Error = any, Data = any> =
  | Failure<Error>
  | Next<Data>

export interface ExtendedFailure extends Failure {
  ctx: ExecutionContext
}

export type ExtendedMiddlewareResult = ExtendedFailure | Next

export function Next<Data>(data: Data, ctx: ExecutionContext): Next<Data> {
  return {
    tag: NextURI,
    data,
    ctx,
  }
}

export function isNext(result: Tag): result is Next {
  return result.tag === 'next'
}

export interface Middleware<Input = any, Output = any, Env = any, Error = any> {
  (
    input: Input,
    env: Env,
    ctx: ExecutionContext,
  ): Resolvable<MiddlewareResult<Error, Output>>
}

export interface ExtendedMiddleware {
  (
    input: any,
    env: any,
    ctx: ExecutionContext,
  ): Resolvable<ExtendedMiddlewareResult>
}

export function middlewareChain(middlewares: Middleware[]): ExtendedMiddleware {
  return (input, env, ctx) => {
    if (!middlewares.length) return Next(input, ctx)

    const ctxPointer = Pointer(ctx)

    const resp = middlewares.reduce(
      (result, middleware) => {
        const apply = forwardResult(middleware, env, ctxPointer)

        if (result instanceof Promise) {
          return result.then(apply)
        }

        return apply(result)
      },
      Next(input, ctx) as Resolvable<MiddlewareResult>,
    )

    return mapResolvable(resp, result => {
      if (isFailure(result))
        return {
          ...result,
          ctx: ctxPointer.get(),
        }

      return result
    })
  }
}

function forwardResult(
  middleware: Middleware,
  env: any,
  ctx: Pointer<ExecutionContext>,
) {
  return (result: MiddlewareResult): Resolvable<MiddlewareResult> => {
    if (isNext(result)) {
      ctx.set(result.ctx)
      return middleware(result.data, env, result.ctx)
    }

    return result
  }
}
