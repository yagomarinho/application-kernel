/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ServiceDefaults } from '../../../application.service'
import type { WithHttpAdapters } from '../capabilities'

export interface HttpDefaults extends ServiceDefaults, WithHttpAdapters {}
