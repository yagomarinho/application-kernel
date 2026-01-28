/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { WsCommandHandler } from '../../../command'
import type { WsEventHandler } from '../../../event'
import type { WsIncomingAdapter, WithWsRegistry } from '../../../composition'
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
} from '../../../../../core'
import type { UID } from '../../../../../shared/uid'
import type { WsIncomingMessage } from '../../../contracts/ports'
import type {
  ApplicationServiceEngine,
  WithGlobalEnvGetter,
} from '../../../../application.service'
import {
  type EmitterIncomingWsOutJob,
  type WsCommandHandlerJob,
  type WsEventHandlerJob,
  type WsHandlersJob,
  type WsMixedEventHandlerJob,
} from '../jobs'

import type {
  EmitterIncomingWsOut,
  WsMixedEventHandler,
} from '../../../mixed.event'

import {
  WsCommandHandlerURI,
  WsEventHandlerURI,
  WsHandlersURI,
  WsMixedInOutURI,
} from '../../../uri'

import { bindResolvableArray, mapResolvable } from '../../../../../helpers'

interface RouteHandlerToExecution {
  execution: Execution
  declaration: WsEventHandler | WsCommandHandler
}
interface CreateExecution extends WithGlobalEnvGetter, WithWsRegistry {
  execution: Execution<any, ExtendedResult>
  declaration: WsMixedEventHandler
  job: EmitterIncomingWsOutJob
}

interface CreateExecutionWithAudienceOutgoing extends Omit<
  CreateExecution,
  'declaration'
> {
  declaration: EmitterIncomingWsOut
}
export interface CompileWsHandlers extends WithGlobalEnvGetter, WithWsRegistry {
  serviceEngine: ApplicationServiceEngine
  uid: UID
}

function createExecutionWithAdapter({
  execution,
  incomingAdapter,
}: {
  execution: Execution
  incomingAdapter: WsIncomingAdapter
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
}: RouteHandlerToExecution) {
  return createExecutionWithAdapter({
    execution,
    incomingAdapter: declaration.incomingAdapter,
  })
}

function createExecutionWithAudienceOutgoing({
  globalEnv,
  execution,
  declaration,
  job,
  registry,
}: CreateExecutionWithAudienceOutgoing): Execution<any, ResultWithAudience> {
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
  registry,
  globalEnv,
}: CreateExecution) {
  return declaration.on.source === 'ws'
    ? createExecutionWithAdapter({
        execution,
        incomingAdapter: declaration.on.incomingAdapter,
      })
    : createExecutionWithAudienceOutgoing({
        execution,
        declaration: declaration as EmitterIncomingWsOut,
        job,
        globalEnv,
        registry,
      })
}

export function compileWsHandlers({
  serviceEngine,
  uid,
  globalEnv,
  registry,
}: CompileWsHandlers) {
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
      [WsMixedInOutURI]: routeMixedEventExecution,
    }

    const jobs = {
      [WsEventHandlerURI]: WsEventHandlerJob,
      [WsCommandHandlerURI]: WsCommandHandlerJob,
      [WsMixedInOutURI]: WsMixedEventHandlerJob,
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
      execution: executions[uri]({
        execution,
        declaration,
        job,
        globalEnv,
        registry,
      } as any),
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
    tag: WsHandlersURI,
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
    tag: WsHandlersURI,
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
    tag: WsHandlersURI,
    type: WsMixedInOutURI,
  } as any
}
