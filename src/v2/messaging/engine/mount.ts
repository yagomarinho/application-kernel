/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable } from '../../contracts'
import type { CommandHandler, CommandHandlerConfig } from '../command'
import type { EventHandler, EventHandlerConfig } from '../event'
import type { MessagingDefaults } from './messaging.defaults'
import type { MessagingHandlerConfig, MessagingHandlerMapper } from './engine'

import { mountApplicationService } from '../../application.service'

function mountCommandHandler(
  defaults: MessagingDefaults,
  { on, emits, ...rest }: RequiredTaggable<CommandHandlerConfig>,
): CommandHandler {
  const applicationService = mountApplicationService(defaults)(rest)

  return {
    ...applicationService,
    on,
    emits,
    tag: rest.tag,
  }
}

function mountEventHandler(
  defaults: MessagingDefaults,
  { on, ...rest }: RequiredTaggable<EventHandlerConfig>,
): EventHandler {
  const applicationService = mountApplicationService(defaults)(rest)

  return {
    ...applicationService,
    on,
    tag: rest.tag,
  }
}

export function mountMessagingHandler(defaults: MessagingDefaults) {
  return <C extends MessagingHandlerConfig>(
    config: RequiredTaggable<C>,
  ): MessagingHandlerMapper<C> => {
    const mount =
      config.tag === 'command.handler' ? mountCommandHandler : mountEventHandler

    return mount(defaults, config as any) as any
  }
}
