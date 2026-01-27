/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MessagingHandler } from '../create.messaging.engine'
import type { CommandJob, EventJob, MessagingJob } from '../job'
import type { ApplicationServiceEngine } from '../../../application.service'
import type { UID } from '../../../../shared/uid'

import { type Compilation, ExtendedResult } from '../../../../core'
import { CommandhandlerURI, EventHandlerURI, MessagingURI } from '../../uri'

export interface CompileMessagingHandler {
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

export function compileMessagingHandler({
  serviceEngine,
  uid,
}: CompileMessagingHandler) {
  return (declaration: MessagingHandler): Compilation<MessagingJob>[] => {
    const [{ execution }] = serviceEngine.compile(declaration)

    const id = uid.generate()
    const compilation: Compilation<MessagingJob, any, ExtendedResult> = {
      job:
        declaration.tag === 'command.handler'
          ? CommandJob(id, declaration.on, declaration.emits)
          : EventJob(id, declaration.on),
      execution,
    }
    return [compilation]
  }
}

function EventJob(id: string, on: EventJob['on']): EventJob {
  return {
    id,
    on,
    tag: MessagingURI,
    type: EventHandlerURI,
  }
}

function CommandJob(
  id: string,
  on: CommandJob['on'],
  emits: CommandJob['emits'],
): CommandJob {
  return {
    emits,
    id,
    on,
    tag: MessagingURI,
    type: CommandhandlerURI,
  }
}
