/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface WsHandlersEngineOptions
  extends WithGlobalEnvGetter, WithWsRegistry {
  defaults?: Partial<WsHandlersDefaults>
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

export function WsHandlersEngine({
  globalEnv,
  defaults,
  serviceEngine,
  uid,
  registry,
}: WsHandlersEngineOptions): WsHandlersEngine {
  return {
    declare: declareWsHandlers({
      defaults: resolveWsHandlersDefaults(defaults),
      serviceEngine,
    }),

    compile: compileWsHandlers({
      globalEnv,
      serviceEngine,
      uid,
      registry,
    }),

    jobs: jobsWsHandlers({ registry }),

    run: runWsHandlers({ registry }),
  }
}
