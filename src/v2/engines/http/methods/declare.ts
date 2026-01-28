/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RequiredTaggable, WithDefaults } from '../../../core'
import type { WithServiceEngine } from '../../__contracts__'
import type { HttpConfig, HttpDefaults, HttpRoute } from '../contracts'

import { concatenate } from '@yagomarinho/smooth/concatenate'
import { resolveHttpAdapters } from '../resolvers'

export interface DeclareHttpRoute
  extends WithDefaults<HttpDefaults>, WithServiceEngine {}

export function declareHttpRoute({
  defaults,
  serviceEngine,
}: DeclareHttpRoute) {
  return (declaration: RequiredTaggable<HttpConfig>): HttpRoute => {
    const serviceDeclaration = serviceEngine.declare(declaration, {
      defaults,
    })

    const adapters = resolveHttpAdapters({ declaration, defaults })

    return concatenate(serviceDeclaration, {
      adapters,
      method: declaration.method,
      path: declaration.path,
      tag: declaration.tag,
    })
  }
}
