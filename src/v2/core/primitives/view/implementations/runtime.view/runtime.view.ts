/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApplicationView } from '../application.view'
import { EnvView } from '../env.view'

export interface RuntimeView extends EnvView, ApplicationView {}
