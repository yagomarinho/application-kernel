/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Job } from '../../contracts'
import { AcceptIncoming, EndsEmits } from '../../messaging'
import { DerivedAcceptIncoming, DerivedEndsEmits } from '../composition'
import {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsMixedEventHandlerURI,
  WsRouteConnectionURI,
} from '../uri'

export interface WsOnConnectionEventJob extends Job<WsRouteConnectionURI> {
  type: 'event'
}
export interface WsOnConnectionCommandJob extends Job<WsRouteConnectionURI> {
  type: 'command'
  emits: (EndsEmits | DerivedEndsEmits)['emits']
}

export type WsRouteConnectionJob =
  | WsOnConnectionEventJob
  | WsOnConnectionCommandJob

export interface WsEventHandlerJob
  extends Job<WsEventHandlerURI>, AcceptIncoming {}

export interface WsCommandHandlerJob
  extends Job<WsCommandHandlerURI>, AcceptIncoming, EndsEmits {}

export interface WsMixedEventHandlerJob
  extends
    Job<WsMixedEventHandlerURI>,
    DerivedAcceptIncoming,
    DerivedEndsEmits {}

export type WsHandlersJob =
  | WsEventHandlerJob
  | WsCommandHandlerJob
  | WsMixedEventHandlerJob

export type WsJobs = WsRouteConnectionJob | WsHandlersJob
