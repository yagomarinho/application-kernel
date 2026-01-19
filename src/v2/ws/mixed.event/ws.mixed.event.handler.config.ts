/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  AcceptEmitterIncoming,
  AcceptWsIncoming,
  IncomingAdapter,
} from '../composition'
import type { WsMixedEventHandler } from './ws.mixed.event.handler'

type RequiredKeys = 'on' | 'emits' | 'handler'

type Config = Omit<WsMixedEventHandler, 'on'> & {
  on:
    | AcceptEmitterIncoming
    | (Omit<AcceptWsIncoming, 'incomingAdapter'> & {
        incomingAdapter?: IncomingAdapter
      })
}

export type WsMixedEventHandlerConfig = Partial<Omit<Config, RequiredKeys>> &
  Pick<Config, RequiredKeys>
