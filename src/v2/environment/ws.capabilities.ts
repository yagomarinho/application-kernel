/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Audience } from '../engines/ws'
import type { Job } from '../core'
import type { Environment } from './environment'

import { createEnvironmentKey } from './environment.key'
import { globalCapabilities } from './capabilities'
import { getOrInitArray, getOrInitMap } from '../shared'

export interface Assignment {
  job: Job
  audience: Audience
}

export interface WsRegistry {
  audiences: {
    register(assignment: Assignment): void
    resolve(job: Job): Audience[]
  }
}

export const audienceKey =
  createEnvironmentKey<Map<string, Audience[]>>('audience')

export function wsCapabilities(env: Environment): WsRegistry {
  const withGlobals = globalCapabilities(env)

  const register: WsRegistry['audiences']['register'] = ({ job, audience }) => {
    if (!withGlobals.jobs.has(job))
      throw new Error('Job not founded to register assignment')

    const audienceMap = getOrInitMap(env, audienceKey)
    const audiences = getOrInitArray(audienceMap, job.id)

    audiences.push(audience)
  }

  const resolve: WsRegistry['audiences']['resolve'] = job => {
    if (!withGlobals.jobs.has(job))
      throw new Error('Job not founded to resolve audience')

    const audienceMap = getOrInitMap(env, audienceKey)
    const audiences = getOrInitArray(audienceMap, job.id)

    return audiences
  }

  return {
    audiences: {
      register,
      resolve,
    },
  }
}
