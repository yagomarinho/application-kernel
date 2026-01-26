/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpRoute } from '../../route'
import type { HttpJob } from '../job'
import type { UID } from '../../../uid'

import { concatenate } from '@yagomarinho/utils-toolkit/concatenate'

import { ApplicationPayload, type Compilation, Job } from '../../../contracts'
import { HttpURI } from '../../uri'
import { ApplicationServiceEngine } from '../../../application.service'
import { HttpRequest, HttpResponse } from '../../ports'
import { mapResolvable } from '../../../helpers'

interface CompileHttpRoute {
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

export function compileHttpRoute({ serviceEngine, uid }: CompileHttpRoute) {
  return ({
    adapters,
    env,
    guardian,
    handler,
    method,
    middlewares,
    onError,
    path,
    postprocessors,
  }: HttpRoute): Compilation<HttpJob, HttpRequest, HttpResponse>[] => {
    const [{ execution }] = serviceEngine.compile({
      env,
      guardian,
      handler,
      middlewares,
      onError,
      postprocessors,
    })

    const execute = ({ context, data }: ApplicationPayload<HttpRequest>) =>
      mapResolvable(
        execution.execute({ data: adapters.requestAdapter(data), context }),
        result => adapters.responseAdapter(result),
      )

    const compilation: Compilation<HttpJob, HttpRequest, HttpResponse> = {
      job: concatenate(Job(uid.generate(), HttpURI), {
        path,
        method,
      }),
      execution: { execute },
    }

    return [compilation]
  }
}
