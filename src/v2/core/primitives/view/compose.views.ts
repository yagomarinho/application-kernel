/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MergeView } from './merge.view'
import type { View } from './view'

import { concatenate } from '@yagomarinho/smooth/concatenate'

export function composeViews<V extends View<any>[]>(...views: V): MergeView<V> {
  return (env =>
    views.reduce(
      (applicationView, capability) =>
        concatenate(applicationView, capability(env)),
      {},
    )) as any
}
