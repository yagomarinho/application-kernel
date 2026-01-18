/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsMixedEventHandler } from './ws.mixed.event.handler'

type RequiredKeys = 'on' | 'emits' | 'handler'

export type WsMixedEventHandlerConfig = Partial<
  Omit<WsMixedEventHandler, RequiredKeys>
> &
  Pick<WsMixedEventHandler, RequiredKeys>
