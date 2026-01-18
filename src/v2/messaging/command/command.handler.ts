/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { ServiceBase } from '../../contracts'
import type { CommandHandlerConfig } from './command.handler.config'
import type { MessageEngineBinder, MessagingEngine } from '../engine'
import type { AcceptIncoming, EndsEmits } from '../composition'

import { MessagingHandlerURI } from '../uri'
import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'

export const CommandHandlerURI = 'command.handler'
export type CommandHandlerURI = typeof CommandHandlerURI

/**
 * CommandHandler defines an Application Service that handles a Command
 * and is contractually required to return a result.
 *
 * A CommandHandler:
 * - represents an application-level entrypoint
 * - is synchronous by contract (input → output), even if async by execution
 * - does not depend on transport, protocol, or infrastructure
 * - protects its contract through validation, error translation and post-processing
 *
 * It is conceptually equivalent to an HttpRoute, but message-based.
 *
 * Pipeline:
 * RawInput
 *  → Middlewares        (technical concerns)
 *  → Guardian           (semantic validation / casting)
 *  → UseCase            (business logic)
 *  → Postprocessors     (side-effects / output mapping)
 *  → FinalOutput
 *
 * Errors are intercepted and translated via `onError` to ensure
 * the command contract is never violated.
 */
export interface CommandHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  FinalOutput = Output,
  Env = unknown,
>
  extends
    ServiceBase<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    AcceptIncoming<RawInput>,
    EndsEmits<FinalOutput>,
    Tag<CommandHandlerURI> {}

export function CommandHandler<
  RawInput,
  GuardInput,
  Input,
  Output,
  FinalOutput,
  Env,
>({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: CommandHandlerConfig<
  RawInput,
  GuardInput,
  Input,
  Output,
  FinalOutput,
  Env
>): MessageEngineBinder {
  const target = (engine: MessagingEngine) =>
    engine.mount({
      on,
      emits,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      tag: CommandHandlerURI,
    })

  return applyEntry('resource', MessagingHandlerURI)(target)
}
