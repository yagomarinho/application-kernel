/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Job } from '../../../../data'
import type { Compilation } from '../../../../meta'
import type { ApplicationView } from './application.view'
import type { View } from '../../view'

import { createAmbientKey } from '../../../ambient'
import { getOrInitMap } from '../../../../../shared'

export const compilationKey =
  createAmbientKey<Map<string, Compilation>>('compilation')
export const jobsKey = createAmbientKey<Map<string, Job[]>>('jobs')

export const createApplicationView: View<ApplicationView> = ambient => {
  const attach: ApplicationView['compilation']['attach'] = ({
    job,
    execution,
  }) => {
    const compilationMap = getOrInitMap(ambient, compilationKey)
    compilationMap.set(job.id, { job, execution })
  }

  const list: ApplicationView['jobs']['list'] = tag => {
    const jobsMap = ambient.get(jobsKey)
    if (!jobsMap) return []

    return tag ? (jobsMap.get(tag) ?? []) : [...jobsMap.values()].flat()
  }

  const has: ApplicationView['jobs']['has'] = job => {
    const compilationMap = ambient.get(compilationKey)
    const compilation = compilationMap?.get(job.id)

    if (!compilation || compilation.job.tag !== job.tag) return false

    return true
  }

  const resolve: ApplicationView['jobs']['resolve'] = job => {
    const compilationMap = ambient.get(compilationKey)
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
