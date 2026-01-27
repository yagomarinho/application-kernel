/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationPayload, Compilation } from '../../../core'
import { mapResolvable } from '../../../shared'
import { HttpJob, HttpRequest, HttpResponse, HttpRoute } from '../contracts'
import { resolveHttpPipeline } from '../resolvers'
import { HttpURI } from '../uri'

interface CompileHttpRoute {
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

export function compileHttpRoute({ serviceEngine, uid }: CompileHttpRoute) {
  return (
    declaration: HttpRoute,
  ): Compilation<HttpJob, HttpRequest, HttpResponse>[] => {
    const httpPipeline = resolveHttpPipeline({ declaration, serviceEngine })

    const compilation: Compilation<HttpJob, HttpRequest, HttpResponse> = {
      job: {
        id: uid.generate(),
        tag: HttpURI,
        path,
        method,
      },
      execution: { execute },
    }

    return [compilation]
  }
}
