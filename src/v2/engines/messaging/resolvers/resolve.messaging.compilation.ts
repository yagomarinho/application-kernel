/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithUID } from '../../../core'
import type { MessagingCompilationMapper, MessagingHandler } from '../contracts'
import { createMessagingJob, CreateMessagingJobDeclaration } from '../jobs'

export interface ResolveMessagingCompilation<
  C extends MessagingHandler,
> extends WithUID {
  declaration: CreateMessagingJobDeclaration<C>
  execution: MessagingCompilationMapper<C>['execution']
}

export function resolveMessagingCompilation<C extends MessagingHandler>({
  declaration,
  execution,
  uid,
}: ResolveMessagingCompilation<C>): MessagingCompilationMapper<C> {
  const compilation: any = {
    job: createMessagingJob({ id: uid.generate(), declaration }),
    execution,
  }

  return compilation
}
