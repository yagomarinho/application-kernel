/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MessageLike } from '../message.like'

export interface EndsEmits<Output> {
  /**
   * Identifies the expected result of the Command.
   *
   * - Defines the command response contract
   * - May be transformed or enriched by postprocessors
   * - Always expected to be produced (success or failure)
   */
  emits: MessageLike<Output>
}
