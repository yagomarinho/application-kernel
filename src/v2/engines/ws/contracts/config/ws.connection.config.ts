/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type RequiredKeys = 'path' | 'handlers'

type Config = Omit<WsRouteConnection, 'handlers' | 'onConnection'> & {
  onConnection: Omit<ApplicationServiceConfig, 'tag'> & {
    incomingAdapter?: IncomingAdapter
    emits?: EndsEmits['emits'] | DerivedEndsEmits['emits']
  }
  handlers: WsHandlersEngineBinder[]
}

export type WsRouteConnectionConfig = Partial<Omit<Config, RequiredKeys>> &
  Pick<Config, RequiredKeys>
