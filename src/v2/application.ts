/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpEngine, HttpEngineBinder, HttpURI } from './http'
import {
  MessagingEngine,
  MessagingEngineBinder,
  MessagingURI,
} from './messaging'
import { WsConnectionEngine, WsConnectionEngineBinder, WsURI } from './ws'

interface ApplicationConfig {
  routes: (
    | HttpEngineBinder
    | MessagingEngineBinder
    | WsConnectionEngineBinder
  )[]
}

interface Application {
  mount: () => void
}

type Engines = {
  [HttpURI]: HttpEngine
  [MessagingURI]: MessagingEngine
  [WsURI]: WsConnectionEngine
}

export function createApplication({ routes }: ApplicationConfig): Application {
  const engines: Engines = {
    [HttpURI]: HttpEngine(),
    [MessagingURI]: MessagingEngine(),
    [WsURI]: WsEngine(),
  }

  const mount: Application['mount'] = () => {
    const mountedRoutes = routes.map(binder =>
      binder(engines[binder.resource] as any),
    )
  }

  return {
    mount,
  }
}
