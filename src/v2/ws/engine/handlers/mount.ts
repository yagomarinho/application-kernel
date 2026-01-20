/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mountApplicationService } from '../../../application.service'
import { RequiredTaggable } from '../../../contracts'
import { WsCommandHandler, WsCommandHandlerConfig } from '../../command'
import { WsEventHandler, WsEventHandlerConfig } from '../../event'
import {
  WsMixedEventHandler,
  WsMixedEventHandlerConfig,
} from '../../mixed.event'
import {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsMixedEventHandlerURI,
} from '../../uri'

import { WsHandlersDefaults } from './defaults'
import { WsHandlersConfig, WsHandlersMapper } from './engine'

export function mountWsCommandHandler(
  defaults: WsHandlersDefaults,
  {
    on,
    emits,
    incomingAdapter,
    ...rest
  }: RequiredTaggable<WsCommandHandlerConfig>,
): WsCommandHandler {
  const applicationService = mountApplicationService(defaults)(rest)

  return {
    on,
    emits,
    incomingAdapter: incomingAdapter ?? defaults.incomingAdapter,
    tag: rest.tag,
    ...applicationService,
  }
}

export function mountWsEventHandler(
  defaults: WsHandlersDefaults,
  { on, incomingAdapter, ...rest }: RequiredTaggable<WsEventHandlerConfig>,
): WsEventHandler {
  const applicationService = mountApplicationService(defaults)(rest)

  return {
    on,
    incomingAdapter: incomingAdapter ?? defaults.incomingAdapter,
    tag: rest.tag,
    ...applicationService,
  }
}

export function mountWsMixedEventHandler(
  defaults: WsHandlersDefaults,
  { on, emits, ...rest }: RequiredTaggable<WsMixedEventHandlerConfig>,
): WsMixedEventHandler {
  const applicationService = mountApplicationService(defaults)(rest)

  return {
    on:
      on.source === 'ws'
        ? {
            ...on,
            incomingAdapter: on.incomingAdapter ?? defaults.incomingAdapter,
          }
        : on,
    emits,
    tag: rest.tag,
    ...applicationService,
  }
}

export function mountWsHandlers(defaults: WsHandlersDefaults) {
  return <C extends WsHandlersConfig>(
    config: RequiredTaggable<C>,
  ): WsHandlersMapper<C> => {
    const mounts = {
      [WsCommandHandlerURI]: mountWsCommandHandler,
      [WsEventHandlerURI]: mountWsEventHandler,
      [WsMixedEventHandlerURI]: mountWsMixedEventHandler,
    }

    const mount = mounts[config.tag]

    return mount(defaults, config as any) as any
  }
}
