/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable, WithDefaults } from '../../../core'
import type { ApplicationService } from '../../application.service'
import type { CommandConfig, MessagingDefaults } from '../contracts'

import { concatenate } from '@yagomarinho/smooth/concatenate'

export interface DeclareCommandHandler
  extends
    WithDefaults<MessagingDefaults>,
    ApplicationService.WithServiceEngine {
  declaration: RequiredTaggable<CommandConfig>
}

export function resolveCommandHandlerDeclaration({
  serviceEngine,
  defaults,
  declaration,
}: DeclareCommandHandler) {
  const serviceDeclaration = serviceEngine.declare(declaration, {
    defaults,
  })

  return concatenate(serviceDeclaration, {
    tag: declaration.tag,
    on: declaration.on,
    emits:
      typeof declaration.emits === 'string'
        ? { onSuccess: declaration.emits, onError: declaration.emits }
        : declaration.emits,
  })
}
