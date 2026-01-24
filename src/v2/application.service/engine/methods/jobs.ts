/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Registry } from '../../../registry'

interface JobsApplicationService {
  registry: Registry
}

export function jobsApplicationService({ registry }: JobsApplicationService) {
  return (tag?: string) => registry.listJobs(tag)
}
