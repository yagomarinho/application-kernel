/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable, WithDefaults } from '../../../core'
import type { WithServiceEngine } from '../../__contracts__'
import type { EventConfig, MessagingDefaults } from '../contracts'

import { concatenate } from '@yagomarinho/smooth/concatenate'

export interface DeclareEventHandler
  extends WithDefaults<MessagingDefaults>, WithServiceEngine {
  declaration: RequiredTaggable<EventConfig>
}

export function resolveEventHandlerDeclaration({
  serviceEngine,
  defaults,
  declaration,
}: DeclareEventHandler) {
  const serviceDeclaration = serviceEngine.declare(declaration, {
    defaults,
  })

  return concatenate(serviceDeclaration, {
    tag: declaration.tag,
    on: declaration.on,
  })
}
