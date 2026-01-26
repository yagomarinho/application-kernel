/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithEnvironment } from '../../../core'

import { globalCapabilities } from '../../../environment'

export interface JobsApplicationService extends WithEnvironment {}

export function jobsApplicationService({
  environment,
}: JobsApplicationService) {
  const registry = globalCapabilities(environment)
  return (tag?: string) => registry.jobs.list(tag)
}
