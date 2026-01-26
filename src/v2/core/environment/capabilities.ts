/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Merge } from '@yagomarinho/ts-toolkit'
import { concatenate } from '@yagomarinho/smooth'

import { Environment } from './environment'

export interface Capabilities<T extends {}> {
  (env: Environment): T
}

export type MergeCapabilities<
  C extends Capabilities<any>[],
  R extends {} = {},
> = C['length'] extends 0
  ? R
  : C extends [infer A, ...infer Rest]
    ? Rest extends Capabilities<any>[]
      ? A extends Capabilities<infer B>
        ? MergeCapabilities<Rest, Merge<R, B>>
        : never
      : never
    : never

export function composeCapabilities<C extends Capabilities<any>[]>(
  env: Environment,
  ...capabilities: C
): MergeCapabilities<C> {
  return capabilities.reduce(
    (registry, capability) => concatenate(registry, capability(env)),
    {},
  ) as any
}
