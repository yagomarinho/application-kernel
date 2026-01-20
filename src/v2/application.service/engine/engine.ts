/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tag } from '@yagomarinho/domain-kernel'
import { Engine, EngineBinder } from '../../contracts'
import { ApplicationService } from '../application.service'
import {
  ApplicationServiceDefaults,
  resolveApplicationServiceDefaults,
} from './defaults'
import { mountApplicationService } from './mount'

type RequiredKeys = 'handler'

export type ApplicationServiceConfig = Partial<
  Omit<ApplicationService, RequiredKeys>
> &
  Pick<ApplicationService, RequiredKeys> &
  Tag

export interface ApplicationServiceEngine extends Engine<
  ApplicationServiceConfig,
  ApplicationService
> {}

export type ApplicationServiceEngineBinder = EngineBinder<
  ApplicationServiceEngine,
  string
>

export interface ApplicationServiceEngineOptions {
  defaults?: Partial<ApplicationServiceDefaults>
}

export function ApplicationServiceEngine({
  defaults,
}: ApplicationServiceEngineOptions = {}): ApplicationServiceEngine {
  const ensureDefaults = resolveApplicationServiceDefaults(defaults)

  const mount: ApplicationServiceEngine['mount'] =
    mountApplicationService(ensureDefaults)

  return {
    mount,
  }
}
