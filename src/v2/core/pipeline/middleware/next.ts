/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'
import type { WithContext } from '../../capabilities'
import type { ApplicationContext } from '../../data'

export const NextURI = 'next'
export type NextURI = typeof NextURI

export interface Next<Data = any> extends Tag<NextURI>, WithContext {
  data: Data
}

export function Next<Data>(
  data: Data,
  context: ApplicationContext,
): Next<Data> {
  return {
    tag: NextURI,
    data,
    context,
  }
}

export function isNext(result: Tag): result is Next {
  return result.tag === 'next'
}
