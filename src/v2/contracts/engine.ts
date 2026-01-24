/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ExecutionContext,
  Resolvable,
  Resource,
  Result,
  Tag,
} from '@yagomarinho/domain-kernel'

export type RequiredTaggable<C extends { tag?: string }> = C & {
  tag: NonNullable<C['tag']>
}

export type EngineBinder<E extends Engine, T extends string> = ((
  engine: E,
) => ReturnType<E['declare']>) &
  Resource<T>

export interface ApplicationPayload<T = any> {
  data: T
  context: ExecutionContext
}

export interface Execution<T extends ApplicationPayload> {
  execute: (payload: T) => Resolvable<Result>
}

export interface Compilation<Job, Payload extends ApplicationPayload> {
  job: Job
  execution: Execution<Payload>
}

export interface Engine<
  Config extends Partial<Tag> = any,
  Declaration = any,
  Job = any,
  Payload extends ApplicationPayload = ApplicationPayload,
> {
  declare: (config: RequiredTaggable<Config>) => Declaration
  compile: (declaration: Declaration) => Compilation<Job, Payload>
  run: (job: Job, payload: Payload) => Resolvable<Result>
  jobs: () => Job[]
}
