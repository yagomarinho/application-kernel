/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'
import type { ApplicationService } from '../../../application.service'
import type { WithEmits, WithOn } from '../capabilities'
import type { Emits } from '../meta'

import type { CommandhandlerURI } from '../../uri'

export interface CommandHandler
  extends
    ApplicationService,
    WithOn<string>,
    WithEmits<Emits<string>>,
    Tag<CommandhandlerURI> {}
