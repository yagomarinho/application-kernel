/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MessagingCompilationMapper, MessagingHandler } from '../contracts'

export function resolveMessagingExecution<C extends MessagingHandler>({
  declaration,
  serviceEngine,
}): MessagingCompilationMapper<C>['execution'] {
  const [{ execution }] = serviceEngine.compile(declaration)

  return execution
}
