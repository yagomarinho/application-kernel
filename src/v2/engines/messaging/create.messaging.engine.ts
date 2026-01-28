/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  WithApplicationView,
  WithPartialDefaults,
  WithUID,
} from '../../core'
import type { WithServiceEngine } from '../__contracts__'
import type { MessagingDefaults, MessagingEngine } from './contracts'

import {
  compileMessagingHandler,
  declareMessagingHandler,
  jobsMessagingHandler,
  runMessagingHandler,
} from './methods'
import { resolveMessagingDefaults } from './resolvers'

export interface MessagingEngineOptions
  extends
    WithPartialDefaults<MessagingDefaults>,
    WithServiceEngine,
    WithUID,
    WithApplicationView {}

export function MessagingEngine({
  defaults,
  serviceEngine,
  view,
  uid,
}: MessagingEngineOptions): MessagingEngine {
  return {
    declare: declareMessagingHandler({
      defaults: resolveMessagingDefaults(defaults),
      serviceEngine,
    }),

    compile: compileMessagingHandler({
      serviceEngine,
      uid,
    }),

    jobs: jobsMessagingHandler({
      view,
    }),

    run: runMessagingHandler({ view }),
  }
}
