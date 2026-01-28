/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithUID } from '../../../core'
import type { WithServiceEngine } from '../../__contracts__'
import type { HttpCompilation, HttpRoute } from '../contracts'
import { resolveHttpCompilation, resolveHttpPipeline } from '../resolvers'

export interface CompileHttpRoute extends WithServiceEngine, WithUID {}

export function compileHttpRoute({ serviceEngine, uid }: CompileHttpRoute) {
  return (declaration: HttpRoute): HttpCompilation[] => {
    const httpPipeline = resolveHttpPipeline({ declaration, serviceEngine })

    const compilation = resolveHttpCompilation({
      uid,
      declaration,
      execution: { execute: httpPipeline },
    })

    return [compilation]
  }
}
