/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithUID } from '../../../core'
import type {
  ExclusiveHttpRequiredKeys,
  HttpCompilation,
  HttpRoute,
} from '../contracts'
import { createHttpJob } from '../jobs'

export interface ResolveHttpCompilation extends WithUID {
  declaration: Pick<HttpRoute, ExclusiveHttpRequiredKeys>
  execution: HttpCompilation['execution']
}

export function resolveHttpCompilation({
  uid,
  declaration: { method, path },
  execution,
}: ResolveHttpCompilation) {
  const compilation: HttpCompilation = {
    job: createHttpJob({ id: uid.generate(), method, path }),
    execution,
  }

  return compilation
}
