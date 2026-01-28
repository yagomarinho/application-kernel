/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CommandJob } from '../contracts'

import { CommandhandlerURI, MessagingURI } from '../uri'

export function createCommandJob(
  id: string,
  on: CommandJob['on'],
  emits: CommandJob['emits'],
): CommandJob {
  return {
    emits,
    id,
    on,
    tag: MessagingURI,
    type: CommandhandlerURI,
  }
}
