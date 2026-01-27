/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EngineBinder } from '../../../../core'
import type { MessagingURI } from '../../uri'
import type { MessagingEngine } from './messaging.engine'

export type MessagingEngineBinder = EngineBinder<MessagingEngine, MessagingURI>
