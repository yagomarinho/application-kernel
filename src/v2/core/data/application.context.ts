/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ExecutionContext } from '@yagomarinho/domain-kernel'

export type ApplicationContext<
  T extends Record<string, any> = Record<string, any>,
> = Partial<ExecutionContext> & T
