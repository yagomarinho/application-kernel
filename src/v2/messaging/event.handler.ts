/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ServiceBase } from '../contracts'
import { EventHandlerConfig } from './event.handler.config'
import { MessagingEngine } from './engine'
import { MessageLike } from './message.like'

export interface EventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = void,
  Env = unknown,
> extends ServiceBase<RawInput, GuardInput, Input, Output, void, Env> {
  /**
   * Identifies the Command this handler consumes.
   *
   * - Semantic identifier only (string)
   * - Strongly typed payload at compile-time
   * - Used for routing and contract definition
   */
  input: MessageLike<RawInput>
}

export function EventHandler<RawInput, GuardInput, Input, Output, Env>({
  input,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: EventHandlerConfig<RawInput, GuardInput, Input, Output, Env>) {
  return (engine: MessagingEngine) =>
    engine.mount({
      input,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
    })
}
