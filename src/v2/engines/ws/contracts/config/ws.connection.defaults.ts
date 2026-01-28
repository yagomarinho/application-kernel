/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type OmittedKeys = 'guardian'

type OnConnectionDefaults = Omit<OnConnection, 'emits'>

interface WithOnConnectionDefaults {
  onConnection: OnConnectionDefaults
}

export interface WsRouteConnectionDefaults
  extends
    Omit<ServiceDefaults, OmittedKeys>,
    WithOnConnectionDefaults,
    WithWsAdapter {}
