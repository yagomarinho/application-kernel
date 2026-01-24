/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpEngine, HttpEngineBinder, HttpRoute, HttpURI } from './http'
import {
  MessagingEngine,
  MessagingEngineBinder,
  MessagingHandler,
  MessagingURI,
} from './messaging'
import {
  WsRouteConnectionEngineBinder,
  WsRouteConnectionEngine,
  WsURI,
  WsHandlersEngine,
  WsRouteConnection,
} from './ws'

export type AcceptBinders =
  | HttpEngineBinder
  | MessagingEngineBinder
  | WsRouteConnectionEngineBinder

type EnginesMap = {
  [HttpURI]: HttpEngine
  [MessagingURI]: MessagingEngine
  [WsURI]: WsRouteConnectionEngine
}

type MountedMap = {
  [HttpURI]: HttpRoute[]
  [MessagingURI]: MessagingHandler[]
  [WsURI]: WsRouteConnection[]
}

export interface ApplicationConfig {
  routes: AcceptBinders[]
}

export interface Application {
  mount: () => void
}

export function createApplication({ routes }: ApplicationConfig): Application {
  const engines: EnginesMap = {
    [HttpURI]: HttpEngine(),
    [MessagingURI]: MessagingEngine(),
    [WsURI]: WsRouteConnectionEngine({ handlersEngine: WsHandlersEngine() }),
  }

  const mount: Application['mount'] = () => {
    const mountedMap = routes.reduce(
      (acc, binder) => {
        const resource = binder.resource
        const engine: any = engines[resource]
        const mounted: any = binder(engine)
        acc[resource].push(mounted)

        return acc
      },
      { [HttpURI]: [], [MessagingURI]: [], [WsURI]: [] } as MountedMap,
    )

    // qual seria o próximo passo agora que todas as rotas estão montadas?
    // montar o pipeline de engine
    // seria adaptar cada rota dentro do seu devido app
    // depois que estiver adaptado, então
  }

  return {
    mount,
  }
}
