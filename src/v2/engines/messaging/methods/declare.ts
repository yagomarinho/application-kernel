/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable, WithDefaults } from '../../../core'
import type { WithServiceEngine } from '../../__contracts__'
import type {
  MessagingConfig,
  MessagingConfigToHandlerMapper,
  MessagingDefaults,
} from '../contracts'

import {
  resolveCommandHandlerDeclaration,
  resolveEventHandlerDeclaration,
} from '../resolvers'
import { CommandhandlerURI } from '../uri'

export interface DeclareMessagingHandler
  extends WithDefaults<MessagingDefaults>, WithServiceEngine {}

export function declareMessagingHandler({
  serviceEngine,
  defaults,
}: DeclareMessagingHandler) {
  return <C extends MessagingConfig>(
    declaration: RequiredTaggable<C>,
  ): MessagingConfigToHandlerMapper<C> =>
    declaration.tag === CommandhandlerURI
      ? (resolveCommandHandlerDeclaration({
          serviceEngine,
          defaults,
          declaration,
        }) as any)
      : (resolveEventHandlerDeclaration({
          serviceEngine,
          defaults,
          declaration,
        }) as any)
}
