/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Merge } from '@yagomarinho/ts-toolkit'
import type { View } from './view'

export type MergeView<
  C extends View<any>[],
  R extends {} = {},
> = C['length'] extends 0
  ? View<R>
  : C extends [infer A, ...infer Rest]
    ? Rest extends View<any>[]
      ? A extends View<infer B>
        ? MergeView<Rest, Merge<R, B>>
        : never
      : never
    : never
