/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { composeCapabilities, globalCapabilities } from '../../../environment'
import { WithEnvironment } from '../../../core/capabilities'

interface JobsApplicationService extends WithEnvironment {}

export function jobsApplicationService({
  environment,
}: JobsApplicationService) {
  const registry = composeCapabilities(environment, globalCapabilities)
  return (tag?: string) => registry.jobs.list(tag)
}
