/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ExecutionContext,
  Failure,
  Resolvable,
  Tag,
} from '@yagomarinho/domain-kernel'

export const NextURI = 'next'
export type NextURI = typeof NextURI

export interface Next<Data = any> extends Tag<NextURI> {
  data: Data
  ctx: ExecutionContext
}

export type MiddlewareResult<Error, Data> = Failure<Error> | Next<Data>

export function Next<Data>(data: Data, ctx: ExecutionContext): Next<Data> {
  return {
    tag: NextURI,
    data,
    ctx,
  }
}

export interface Middleware<Input = any, Output = any, Env = any, Error = any> {
  (
    data: Input,
    env: Env,
    ctx: ExecutionContext,
  ): Resolvable<MiddlewareResult<Error, Output>>
}
