/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExtendedMiddleware } from './extended.middleware'
import type { Middleware } from './middleware'
import type { MiddlewareResult } from './middleware.result'

import { type Resolvable, isFailure } from '@yagomarinho/domain-kernel'
import { type ApplicationContext, AppError } from '../../data'

import { isNext, Next } from './next'
import { failureBoundary, mapResolvable, Pointer } from '../../../shared'

// Local helper
function forwardResult(
  middleware: Middleware,
  env: any,
  context: Pointer<ApplicationContext>,
) {
  return (result: MiddlewareResult): Resolvable<MiddlewareResult> => {
    if (isNext(result)) {
      context.set(result.context)
      return middleware(result.data, env, result.context)
    }

    return result
  }
}

export function middlewareChain(middlewares: Middleware[]): ExtendedMiddleware {
  return (input, env, context) => {
    if (!middlewares.length) return Next(input, context)

    const contextPointer = Pointer(context)

    const resp = middlewares.reduce(
      (result, middleware) => {
        const apply = failureBoundary(
          forwardResult(middleware, env, contextPointer),
        )

        if (result instanceof Promise) {
          return result.then(apply)
        }

        return apply(result)
      },
      Next(input, context) as Resolvable<MiddlewareResult>,
    )

    return mapResolvable(resp, result => {
      if (isFailure(result))
        return AppError.unhandle(result.error, contextPointer.get())

      return result
    })
  }
}
