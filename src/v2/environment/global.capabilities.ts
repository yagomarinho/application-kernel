/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Compilation, Execution, Job } from '../contracts'
import { getOrInitMap } from '../helpers'
import { Environment } from './environment'
import { createEnvironmentKey } from './environment.key'

export interface Registry {
  compilation: {
    attach: (compilation: Compilation) => void
  }

  jobs: {
    list: (tag?: string) => ReadonlyArray<Job>
    has: (job: Job) => boolean
    resolve: (job: Job) => Execution
  }
}

export const compilationKey =
  createEnvironmentKey<Map<string, Compilation>>('compilation')
export const jobsKey = createEnvironmentKey<Map<string, Job[]>>('jobs')

export function globalCapabilities(env: Environment): Registry {
  const attach: Registry['compilation']['attach'] = ({ job, execution }) => {
    const compilationMap = getOrInitMap(env, compilationKey)
    compilationMap.set(job.id, { job, execution })
  }

  const list: Registry['jobs']['list'] = tag => {
    const jobsMap = env.get(jobsKey)
    if (!jobsMap) return []

    return tag ? (jobsMap.get(tag) ?? []) : [...jobsMap.values()].flat()
  }

  const has: Registry['jobs']['has'] = job => {
    const compilationMap = env.get(compilationKey)
    const compilation = compilationMap?.get(job.id)

    if (!compilation || compilation.job.tag !== job.tag) return false

    return true
  }

  const resolve: Registry['jobs']['resolve'] = job => {
    const compilationMap = env.get(compilationKey)
    const compilation = compilationMap?.get(job.id)

    if (!compilation) throw new Error(`No compilation found for job ${job.id}`)

    if (compilation.job.tag !== job.tag)
      throw new Error(
        `Job tag mismatch: expected ${compilation.job.tag}, got ${job.tag}`,
      )

    return compilation.execution
  }

  return {
    compilation: { attach },
    jobs: { list, has, resolve },
  }
}
