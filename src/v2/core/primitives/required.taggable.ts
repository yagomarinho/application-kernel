/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

export type RequiredTaggable<C> =
  C extends Partial<Tag<string>>
    ? C & {
        tag: NonNullable<C['tag']>
      }
    : C
