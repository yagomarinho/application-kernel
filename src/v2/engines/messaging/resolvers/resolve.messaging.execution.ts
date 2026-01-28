/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  MessagingHandlerToCompilationMapper,
  MessagingHandler,
} from '../contracts'
import type { WithServiceEngine } from '../../__contracts__'

import { mapResolvable } from '../../../shared'
import { eventUnhandledError } from '../constants'
import { CommandhandlerURI } from '../uri'

export interface ResolveMessagingExecution<
  C extends MessagingHandler,
> extends WithServiceEngine {
  declaration: C
}
export function resolveMessagingExecution<C extends MessagingHandler>({
  declaration,
  serviceEngine,
}: ResolveMessagingExecution<C>): MessagingHandlerToCompilationMapper<C>['execution'] {
  const [{ execution }] = serviceEngine.compile(declaration)

  return {
    execute: ({ data, context }) =>
      mapResolvable(
        execution.execute({ data, context }),
        result =>
          (declaration.tag === CommandhandlerURI
            ? result
            : eventUnhandledError(result)) as any,
      ),
  }
}
