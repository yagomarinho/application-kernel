/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithUID } from '../../../core'
import type { WithServiceEngine } from '../../__contracts__'
import type {
  MessagingHandlerToCompilationMapper,
  MessagingHandler,
} from '../contracts'

import {
  resolveMessagingCompilation,
  resolveMessagingExecution,
} from '../resolvers'

export interface CompileMessagingHandler extends WithServiceEngine, WithUID {}

export function compileMessagingHandler({
  serviceEngine,
  uid,
}: CompileMessagingHandler) {
  return <C extends MessagingHandler>(
    declaration: C,
  ): MessagingHandlerToCompilationMapper<C>[] => {
    const execution = resolveMessagingExecution<C>({
      declaration,
      serviceEngine,
    })

    const compilation = resolveMessagingCompilation<C>({
      declaration,
      execution,
      uid,
    })

    return [compilation]
  }
}
