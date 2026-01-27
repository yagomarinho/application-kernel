/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { composeViews } from '../../compose.views'
import { View } from '../../view'
import { createApplicationView } from '../application.view'
import { createEnvView } from '../env.view'
import { RuntimeView } from './runtime.view'

export const createRuntimeView: View<RuntimeView> = composeViews(
  createApplicationView,
  createEnvView,
)
