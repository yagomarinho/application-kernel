/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Result } from '@yagomarinho/domain-kernel'

export function eventUnhandledError(result: Result) {
  if (result.tag === 'failure' && !(result as any).handled)
    throw new Error(result.error)
}
