/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MessagingEngine } from './contracts'

export interface MessagingEngineOptions {
  defaults?: Partial<MessagingDefaults>
  serviceEngine: ApplicationServiceEngine
  uid: UID
  registry: Registry
}

export function MessagingEngine({
  defaults,
  serviceEngine,
  uid,
  registry,
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
      registry,
    }),

    run: runMessagingHandler({ registry }),
  }
}
