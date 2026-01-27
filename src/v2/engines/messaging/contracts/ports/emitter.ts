/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Listener<T extends any[] = any[]> = (...args: T) => any

export interface EventPayload {
  event: string
  timestamp: Date
}

export interface Dispatcher {
  dispatch: (eventPayload: EventPayload) => any
}

export type Subscription = () => void

export interface Emitter {
  on: (event: string, listener: Listener) => Subscription
  once: (event: string, listener: Listener) => Subscription
  off: (event: string, listener: Listener) => void
  emit: (event: string, ...args: any[]) => void
}
