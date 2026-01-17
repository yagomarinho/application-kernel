/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ServiceBase } from '../contracts'
import type { CommandHandlerConfig } from './command.handler.config'
import type { MessagingEngine } from './engine'
import type { MessageLike } from './message.like'

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
> extends ServiceBase<RawInput, GuardInput, Input, Output, FinalOutput, Env> {
  /**
   * Identifies the Command this handler consumes.
   *
   * - Semantic identifier only (string)
   * - Strongly typed payload at compile-time
   * - Used for routing and contract definition
   */
  input: MessageLike<RawInput>

  /**
   * Identifies the expected result of the Command.
   *
   * - Defines the command response contract
   * - May be transformed or enriched by postprocessors
   * - Always expected to be produced (success or failure)
   */
  output: MessageLike<Output>
}

export function CommandHandler<
  RawInput,
  GuardInput,
  Input,
  Output,
  FinalOutput,
  Env,
>({
  input,
  output,
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
>) {
  return (engine: MessagingEngine) =>
    engine.mount({
      input,
      output,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
    })
}
