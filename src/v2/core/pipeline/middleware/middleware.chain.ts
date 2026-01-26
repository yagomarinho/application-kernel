/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtendedMiddleware } from './extended.middleware'
import type { Middleware } from './middleware'
import type { MiddlewareResult } from './middleware.result'

import {
  type ExecutionContext,
  type Resolvable,
  isFailure,
} from '@yagomarinho/domain-kernel'

import { isNext, Next } from './next'
import { mapResolvable, Pointer } from '../../../shared'

// Local helper
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
