/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { UseCase } from '@yagomarinho/domain-kernel'

import type { Guardian } from './guardian'
import type { MiddlewareChain } from './middleware'
import type { PostprocessorChain } from './postprocessor'
import type { ErrorHandler } from './error.handler'

export interface ServiceBase<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
> {
  /**
   * Route-scoped environment resolver.
   * Receives the global application environment and
   * derives a narrowed context used by the use case
   * and the execution pipeline of this route.
   */
  env: (globalEnv: unknown) => Env

  /**
   * Technical pre-processing pipeline.
   * Executed after the request adapter and before
   * any domain-level validation.
   *
   * Responsibilities:
   * - authentication (JWT, API keys, sessions)
   * - protocol normalization
   * - request shaping / enrichment
   *
   * Input  : RawInput (output of requestAdapter)
   * Output : GuardInput (input for the guardian)
   */
  middlewares: MiddlewareChain<RawInput, GuardInput>

  /**
   * Semantic validation and authorization layer.
   * Ensures the request is valid and allowed from a
   * domain perspective before executing the use case.
   *
   * Input  : GuardInput
   * Output : Input (use case input)
   */
  guardian: Guardian<GuardInput, Input>

  /**
   * Core application behavior.
   * Pure domain logic that operates on validated input
   * and a resolved environment, producing a domain output.
   */
  handler: UseCase<Input, Output, Env>

  /**
   * Post-domain processing pipeline.
   * Executed after the use case completes successfully.
   *
   * Responsibilities:
   * - data formatting
   * - projection / mapping
   * - side-effects (logging, events, metrics)
   *
   * Input  : Output (use case result)
   * Output : FinalOutput (response adapter input)
   */
  postprocessors: PostprocessorChain<Output, FinalOutput>

  /**
   * Centralized error handling strategy for this route.
   * Receives any error thrown during the execution pipeline
   * and maps it to a recoverable or transport-level response.
   */
  onError: ErrorHandler
}
