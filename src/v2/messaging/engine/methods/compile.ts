/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MessagingHandler } from '../engine'
import type { MessagingJob } from '../job'
import type { CommandHandler } from '../../command'
import type { ApplicationServiceEngine } from '../../../application.service'
import type { UID } from '../../../uid'

import { concatenate } from '@yagomarinho/utils-toolkit'
import { type Compilation, Job } from '../../../contracts'

export interface CompileMessagingHandler {
  applicationServiceEngine: ApplicationServiceEngine
  uid: UID
}

export function compileMessagingHandler({ applicationServiceEngine, uid }) {
  return (declaration: MessagingHandler): Compilation<MessagingJob>[] => {
    const [{ execution }] = applicationServiceEngine.compile(declaration)

    const uri = declaration.tag
    const compilation: Compilation = {
      job: concatenate(
        Job(uid.generate(), uri),
        uri === 'command.handler'
          ? {
              on: declaration.on,
              emits: (declaration as CommandHandler).emits,
            }
          : { on: declaration.on },
      ),
      execution,
    }
    return [compilation as Compilation<MessagingJob>]
  }
}
