/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { ServiceBase } from '../../contracts'
import type { EventHandlerConfig } from './event.handler.config'
import type { MessageEngineBinder, MessagingEngine } from '../engine'
import type { MessageLike } from '../message.like'

import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { MessagingHandlerURI } from '../uri'

export const EventHandlerURI = 'event.handler'
export type EventHandlerURI = typeof EventHandlerURI

export interface EventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = void,
  Env = unknown,
>
  extends
    ServiceBase<RawInput, GuardInput, Input, Output, void, Env>,
    Tag<EventHandlerURI> {
  /**
   * Identifies the Command this handler consumes.
   *
   * - Semantic identifier only (string)
   * - Strongly typed payload at compile-time
   * - Used for routing and contract definition
   */
  on: MessageLike<RawInput>
}

export function EventHandler<RawInput, GuardInput, Input, Output, Env>({
  on,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: EventHandlerConfig<
  RawInput,
  GuardInput,
  Input,
  Output,
  Env
>): MessageEngineBinder {
  const target = (engine: MessagingEngine) =>
    engine.mount({
      on,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      tag: EventHandlerURI,
    })

  return applyEntry('resource', MessagingHandlerURI)(target)
}
