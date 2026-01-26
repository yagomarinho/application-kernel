/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable } from '../../../../core'
import type { CommandHandler, CommandHandlerConfig } from '../../command'
import type { EventHandler, EventHandlerConfig } from '../../event'
import type { MessagingDefaults } from '../defaults'
import type { MessagingHandlerConfig, MessagingHandlerMapper } from '../engine'
import type { ApplicationServiceEngine } from '../../../application.service'

function declareCommandHandler(
  defaults: MessagingDefaults,
  { on, emits, ...rest }: RequiredTaggable<CommandHandlerConfig>,
  serviceEngine: ApplicationServiceEngine,
): CommandHandler {
  const serviceDeclaration = serviceEngine.declare(rest, {
    defaults,
  })

  return {
    ...serviceDeclaration,
    on,
    emits:
      typeof emits === 'string'
        ? { onSuccess: emits, onError: emits }
        : { onSuccess: emits.onSuccess, onError: emits.onError },
    tag: rest.tag,
  }
}

function declareEventHandler(
  defaults: MessagingDefaults,
  { on, ...rest }: RequiredTaggable<EventHandlerConfig>,
  serviceEngine: ApplicationServiceEngine,
): EventHandler {
  const serviceDeclaration = serviceEngine.declare(rest, {
    defaults,
  })

  return {
    ...serviceDeclaration,
    on,
    tag: rest.tag,
  }
}

interface DeclareMessagingHandler {
  defaults: MessagingDefaults
  serviceEngine: ApplicationServiceEngine
}

export function declareMessagingHandler({
  serviceEngine,
  defaults,
}: DeclareMessagingHandler) {
  return <C extends MessagingHandlerConfig>(
    config: RequiredTaggable<C>,
  ): MessagingHandlerMapper<C> => {
    const declare =
      config.tag === 'command.handler'
        ? declareCommandHandler
        : declareEventHandler

    return declare(defaults, config as any, serviceEngine) as any
  }
}
