/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ApplicationServiceEngine } from '../../../../application.service'
import type { RequiredTaggable } from '../../../../../core'
import type { WsCommandHandler, WsCommandHandlerConfig } from '../../../command'
import type { WsEventHandler, WsEventHandlerConfig } from '../../../event'
import type { WsHandlersDefaults } from '../defaults'
import type { WsHandlersConfig, WsHandlersMapper } from '../engine'
import type {
  EmitterIncomingWsOut,
  EmitterIncomingWsOutConfig,
  WsIncomingEmitterOut,
  WsIncomingEmitterOutConfig,
  WsMixedEventHandler,
  WsMixedEventHandlerConfig,
} from '../../../mixed.event'

import {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsMixedEventHandlerURI,
} from '../../../uri'

export function declareWsCommandHandler(
  defaults: WsHandlersDefaults,
  {
    on,
    emits,
    incomingAdapter,
    ...rest
  }: RequiredTaggable<WsCommandHandlerConfig>,
  serviceEngine: ApplicationServiceEngine,
): WsCommandHandler {
  const serviceDeclaration = serviceEngine.declare(rest, {
    defaults,
  })

  return {
    on,
    emits:
      typeof emits === 'string'
        ? { onSuccess: emits, onError: emits }
        : { onSuccess: emits.onSuccess, onError: emits.onError },
    incomingAdapter: incomingAdapter ?? defaults.incomingAdapter,
    tag: rest.tag,
    ...serviceDeclaration,
  }
}

export function declareWsEventHandler(
  defaults: WsHandlersDefaults,
  { on, incomingAdapter, ...rest }: RequiredTaggable<WsEventHandlerConfig>,
  serviceEngine: ApplicationServiceEngine,
): WsEventHandler {
  const serviceDeclaration = serviceEngine.declare(rest, {
    defaults,
  })

  return {
    on,
    incomingAdapter: incomingAdapter ?? defaults.incomingAdapter,
    tag: rest.tag,
    ...serviceDeclaration,
  }
}

export function declareWsIncomingEmitterOut(
  defaults: WsHandlersDefaults,
  { on, emits, ...rest }: RequiredTaggable<WsIncomingEmitterOutConfig>,
  serviceEngine: ApplicationServiceEngine,
): WsIncomingEmitterOut {
  const serviceDeclaration = serviceEngine.declare(rest, {
    defaults,
  })

  return {
    on: {
      ...on,
      incomingAdapter: on.incomingAdapter ?? defaults.incomingAdapter,
    },
    emits: {
      target: emits.target,
      ...('onSuccess' in emits
        ? { onSuccess: emits.onSuccess, onError: emits.onError }
        : { onSuccess: emits.event, onError: emits.event }),
    },
    tag: rest.tag,
    ...serviceDeclaration,
  }
}

export function declareEmitterIncomingWsOut(
  defaults: WsHandlersDefaults,
  { on, emits, ...rest }: RequiredTaggable<EmitterIncomingWsOutConfig>,
  serviceEngine: ApplicationServiceEngine,
): EmitterIncomingWsOut {
  const serviceDeclaration = serviceEngine.declare(rest, {
    defaults,
  })

  return {
    on,
    emits: {
      audience: emits.audience,
      target: emits.target,
      ...('onSuccess' in emits
        ? { onSuccess: emits.onSuccess, onError: emits.onError }
        : { onSuccess: emits.event, onError: emits.event }),
    },
    tag: rest.tag,
    ...serviceDeclaration,
  }
}

export function declareWsMixedEventHandler(
  defaults: WsHandlersDefaults,
  declaration: RequiredTaggable<WsMixedEventHandlerConfig>,
  serviceEngine: ApplicationServiceEngine,
): WsMixedEventHandler {
  return declaration.on.source === 'ws'
    ? declareWsIncomingEmitterOut(defaults, declaration as any, serviceEngine)
    : declareEmitterIncomingWsOut(defaults, declaration as any, serviceEngine)
}

export interface DeclareWsHandlers {
  defaults: WsHandlersDefaults
  serviceEngine: ApplicationServiceEngine
}

export function declareWsHandlers({
  defaults,
  serviceEngine,
}: DeclareWsHandlers) {
  return <C extends WsHandlersConfig>(
    config: RequiredTaggable<C>,
  ): WsHandlersMapper<C> => {
    const declares = {
      [WsCommandHandlerURI]: declareWsCommandHandler,
      [WsEventHandlerURI]: declareWsEventHandler,
      [WsMixedEventHandlerURI]: declareWsMixedEventHandler,
    }

    const declare = declares[config.tag]

    return declare(defaults, config as any, serviceEngine) as any
  }
}
