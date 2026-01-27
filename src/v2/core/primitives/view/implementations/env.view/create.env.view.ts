/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EnvView } from './env.view'
import type { View } from '../../view'

import { type Ambient, createAmbientKey } from '../../../ambient'

export const globalEnvKey = createAmbientKey<any>('globa.env')

export const createEnvView: View<EnvView> = (ambient: Ambient): EnvView => {
  const register: EnvView['env']['register'] = env => {
    ambient.set(globalEnvKey, env)
  }

  const resolve: EnvView['env']['resolve'] = access =>
    access(ambient.get(globalEnvKey))

  return {
    env: {
      register,
      resolve,
    },
  }
}
