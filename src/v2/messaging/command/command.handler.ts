/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Tag } from '@yagomarinho/domain-kernel'

import type { CommandHandlerConfig } from './command.handler.config'
import type { MessagingEngineBinder, MessagingEngine } from '../engine'
import type { AcceptIncoming, EndsEmits } from '../composition'

import { CommandhandlerURI, MessagingURI } from '../uri'
import { applyEntry } from '@yagomarinho/utils-toolkit/apply.entry'
import { ApplicationService } from '../../application.service'

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
export interface CommandHandler
  extends
    ApplicationService,
    AcceptIncoming,
    EndsEmits,
    Tag<CommandhandlerURI> {}

export function CommandHandler({
  on,
  emits,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
}: CommandHandlerConfig): MessagingEngineBinder {
  const target = (engine: MessagingEngine) =>
    engine.declare({
      on,
      emits,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      tag: CommandhandlerURI,
    })

  return applyEntry('resource', MessagingURI)(target)
}
