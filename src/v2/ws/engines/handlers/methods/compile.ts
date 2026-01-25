/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  ResultWithAudience,
  WsHandlers,
  WsHandlersIncomingMapper,
  WsHandlersOutgoingMapper,
} from '../engine'
import type {
  ApplicationPayload,
  Compilation,
  Execution,
  ExtendedResult,
} from '../../../../contracts'
import type { ApplicationServiceEngine } from '../../../../application.service'
import type { UID } from '../../../../uid'
import type { WsIncomingMessage } from '../../../ports'
import type {
  EmitterIncomingWsOutJob,
  WsCommandHandlerJob,
  WsEventHandlerJob,
  WsHandlersJob,
  WsMixedEventHandlerJob,
} from '../jobs'

import {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsMixedEventHandlerURI,
  WsURI,
} from '../../../uri'
import { WsCommandHandler } from '../../../command'
import { WsEventHandler } from '../../../event'
import { IncomingAdapter } from '../../../composition'
import { EmitterIncomingWsOut, WsMixedEventHandler } from '../../../mixed.event'
import { bindResolvableArray, mapResolvable } from '../../../../helpers'
import { WsRegistry } from '../../../../registry'
import { WithGlobalEnvGetter } from '../../../../application.service/composition'

export interface CompileWsHandlers {
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

function createExecutionWithAdapter({
  execution,
  incomingAdapter,
}: {
  execution: Execution
  incomingAdapter: IncomingAdapter
}): Execution<WsIncomingMessage, ExtendedResult> {
  const execute: Execution['execute'] = ({
    context,
    data,
  }: ApplicationPayload<WsIncomingMessage>) =>
    execution.execute({ data: incomingAdapter(data), context })

  return {
    execute,
  }
}

function routeHandlerToExecution({
  execution,
  declaration,
}: {
  execution: Execution
  declaration: WsEventHandler | WsCommandHandler
}) {
  return createExecutionWithAdapter({
    execution,
    incomingAdapter: declaration.incomingAdapter,
  })
}

interface CreateExecution extends WithGlobalEnvGetter {
  execution: Execution<any, ExtendedResult>
  declaration: EmitterIncomingWsOut
  job: EmitterIncomingWsOutJob
  registry: WsRegistry
}

function createExecutionWithAudienceOutgoing({
  globalEnv,
  execution,
  declaration,
  job,
  registry,
}: CreateExecution): Execution<any, ResultWithAudience> {
  const execute: Execution<any, ResultWithAudience>['execute'] = ({
    context,
    data,
  }) => {
    const afterExecution = execution.execute({ data, context })
    const audiences = registry.audiences.resolve(job)

    return mapResolvable(afterExecution, result => {
      const afterResolveAudience = mapResolvable(
        bindResolvableArray(
          declaration.emits.audience.map(resolver =>
            resolver(audiences, declaration.env(globalEnv()), result.ctx),
          ),
        ),
        doubleArr => doubleArr.flatMap(value => value),
      )

      return mapResolvable(afterResolveAudience, audience => ({
        ...result,
        audience,
      }))
    })
  }

  return {
    execute,
  }
}

function routeMixedEventExecution({
  execution,
  declaration,
  job,
}: {
  execution: Execution
  declaration: WsMixedEventHandler
  job: WsMixedEventHandlerJob
}) {
  return declaration.on.source === 'ws'
    ? createExecutionWithAdapter({
        execution,
        incomingAdapter: declaration.on.incomingAdapter,
      })
    : createExecutionWithAudienceOutgoing({
        execution,
        declaration,
        job,
      } as any)
}

export function compileWsHandlers({ serviceEngine, uid }: CompileWsHandlers) {
  return <D extends WsHandlers>(
    declaration: D,
  ): Compilation<
    WsHandlersJob,
    WsHandlersIncomingMapper<D>,
    WsHandlersOutgoingMapper<D>
  >[] => {
    const executions = {
      [WsEventHandlerURI]: routeHandlerToExecution,
      [WsCommandHandlerURI]: routeHandlerToExecution,
      [WsMixedEventHandlerURI]: routeMixedEventExecution,
    }

    const jobs = {
      [WsEventHandlerURI]: WsEventHandlerJob,
      [WsCommandHandlerURI]: WsCommandHandlerJob,
      [WsMixedEventHandlerURI]: WsMixedEventHandlerJob,
    }

    const uri = declaration.tag
    const id = uid.generate()
    const job = jobs[uri](
      id,
      (declaration as any).on,
      (declaration as any).emits,
    )

    const [{ execution }] = serviceEngine.compile(declaration)

    const compilation: Compilation<any, any, any> = {
      job,
      execution: executions[uri]({ execution, declaration, job } as any),
    }
    return [compilation]
  }
}

function WsEventHandlerJob(
  id: string,
  on: WsEventHandlerJob['on'],
): WsEventHandlerJob {
  return {
    id,
    on,
    tag: WsURI,
    type: WsEventHandlerURI,
  }
}

function WsCommandHandlerJob(
  id: string,
  on: WsCommandHandlerJob['on'],
  emits: WsCommandHandlerJob['emits'],
): WsCommandHandlerJob {
  return {
    id,
    on,
    emits,
    tag: WsURI,
    type: WsCommandHandlerURI,
  }
}

function WsMixedEventHandlerJob(
  id: string,
  on: WsMixedEventHandlerJob['on'],
  emits: WsMixedEventHandlerJob['emits'],
): WsMixedEventHandlerJob {
  return {
    id,
    on,
    emits,
    tag: WsURI,
    type: WsMixedEventHandlerURI,
  } as any
}
