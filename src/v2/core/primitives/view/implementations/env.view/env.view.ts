/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EnvHandler } from '../../../../pipeline'

export interface EnvView {
  env: {
    register: (env: any) => void
    resolve: (access: EnvHandler) => any
  }
}
