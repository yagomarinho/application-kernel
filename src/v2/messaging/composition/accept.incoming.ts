/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface AcceptIncoming {
  /**
   * Identifies the Command this handler consumes.
   *
   * - Semantic identifier only (string)
   * - Strongly typed payload at compile-time
   * - Used for routing and contract definition
   */
  on: string
}
