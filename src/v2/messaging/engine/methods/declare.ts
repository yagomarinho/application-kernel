/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable } from '../../../contracts'
import type { CommandHandler, CommandHandlerConfig } from '../../command'
import type { EventHandler, EventHandlerConfig } from '../../event'
import type { MessagingDefaults } from '../defaults'
import type { MessagingHandlerConfig, MessagingHandlerMapper } from '../engine'
import type { ApplicationServiceEngine } from '../../../application.service'

function declareCommandHandler(
  defaults: MessagingDefaults,
  { on, emits, ...rest }: RequiredTaggable<CommandHandlerConfig>,
  applicationServiceEngine: ApplicationServiceEngine,
): CommandHandler {
  const applicationService = applicationServiceEngine.declare(rest, {
    defaults,
  })

  return {
    ...applicationService,
    on,
    emits,
    tag: rest.tag,
  }
}

function declareEventHandler(
  defaults: MessagingDefaults,
  { on, ...rest }: RequiredTaggable<EventHandlerConfig>,
  applicationServiceEngine: ApplicationServiceEngine,
): EventHandler {
  const applicationService = applicationServiceEngine.declare(rest, {
    defaults,
  })

  return {
    ...applicationService,
    on,
    tag: rest.tag,
  }
}

interface DeclareMessagingHandler {
  defaults: MessagingDefaults
  applicationServiceEngine: ApplicationServiceEngine
}

export function declareMessagingHandler({
  applicationServiceEngine,
  defaults,
}: DeclareMessagingHandler) {
  return <C extends MessagingHandlerConfig>(
    config: RequiredTaggable<C>,
  ): MessagingHandlerMapper<C> => {
    const declare =
      config.tag === 'command.handler'
        ? declareCommandHandler
        : declareEventHandler

    return declare(defaults, config as any, applicationServiceEngine) as any
  }
}
