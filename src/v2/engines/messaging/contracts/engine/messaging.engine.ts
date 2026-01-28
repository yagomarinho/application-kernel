/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Engine, RequiredTaggable } from '../../../../core'
import type { MessagingConfig } from '../config'
import type { MessagingHandler } from '../bindings/messaging.handler'
import type { MessagingCompilation } from '../meta'
import type {
  MessagingHandlerToCompilationMapper,
  MessagingConfigToHandlerMapper,
} from './messaging.types'

export interface MessagingEngine extends Engine<
  MessagingConfig,
  MessagingHandler,
  MessagingCompilation
> {
  declare: <C extends MessagingConfig>(
    config: RequiredTaggable<C>,
  ) => MessagingConfigToHandlerMapper<C>

  compile: <C extends MessagingHandler>(
    declaration: C,
  ) => MessagingHandlerToCompilationMapper<C>[]
}
