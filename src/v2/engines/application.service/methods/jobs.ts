/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WithApplicationView } from '../../../core'

export interface JobsApplicationService extends WithApplicationView {}

export function jobsApplicationService({ view }: JobsApplicationService) {
  return (tag?: string) => view.jobs.list(tag)
}
