/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Options {
  defaults?: Partial<HttpRouteDefaults>
  serviceEngine: ApplicationServiceEngine
  uid: UID
  registry: Registry
}

export function createHttpEngine({
  defaults,
  serviceEngine,
  uid,
  registry,
}: Options): HttpEngine {
  return {
    declare: declareHttpRoute({
      defaults: resolveHttpRouteDefaults(defaults),
      serviceEngine,
    }),

    compile: compileHttpRoute({
      serviceEngine,
      uid,
    }),

    jobs: jobsHttpRoute({ registry }),

    run: runHttpRoute({ registry }),
  }
}
