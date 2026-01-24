/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpRoute } from '../../route'
import type { HttpJob } from '../job'

import { concatenate } from '@yagomarinho/utils-toolkit'

import { type Compilation, Job } from '../../../contracts'
import { HttpURI } from '../../uri'
import { ApplicationServiceEngine } from '../../../application.service'
import { UID } from '../../../uid'

interface CompileHttpRoute {
  applicationServiceEngine: ApplicationServiceEngine
  uid: UID
}

export function compileHttpRoute({
  applicationServiceEngine,
  uid,
}: CompileHttpRoute) {
  return (declaration: HttpRoute): Compilation<HttpJob>[] => {
    const [{ execution }] = applicationServiceEngine.compile(declaration)

    const compilation: Compilation<HttpJob> = {
      job: concatenate(Job(uid.generate(), HttpURI), {
        path: declaration.path,
        method: declaration.method,
      }),
      execution,
    }

    return [compilation]
  }
}
