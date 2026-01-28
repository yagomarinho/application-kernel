/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MessagingHandler } from '../contracts'
import type { CreateMessagingJobDeclaration, JobPicker } from './jobs.types'

import { createCommandJob } from './create.command.job'
import { createEventJob } from './create.event.job'

export interface CreateMessagingJob<T extends MessagingHandler['tag']> {
  id: string
  declaration: CreateMessagingJobDeclaration<T>
}

export function createMessagingJob<T extends MessagingHandler['tag']>({
  id,
  declaration,
}: CreateMessagingJob<T>): JobPicker[T] {
  return declaration.tag === 'command.handler'
    ? (createCommandJob(id, declaration.on, declaration.emits) as any)
    : (createEventJob(id, declaration.on) as any)
}
