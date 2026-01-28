/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type RequiredKeys = 'on' | 'emits' | 'handler'

type ConfigWsToEmitter = Omit<WsIncomingEmitterOut, 'on' | 'emits'> & {
  on: Omit<AcceptWsIncoming, 'incomingAdapter'> & {
    incomingAdapter?: IncomingAdapter
  }
  emits: { target: 'emitter'; event: string } | EmitsEmitterOutput
}

type ConfigEmitterToWs = Omit<EmitterIncomingWsOut, 'emits'> & {
  emits:
    | (Omit<EmitsWsOutput, 'onSuccess' | 'onError'> & { event: string })
    | EmitsWsOutput
}

type ApplyConfigKeys<Config extends Record<RequiredKeys, unknown>> = Partial<
  Omit<Config, RequiredKeys>
> &
  Pick<Config, RequiredKeys>

export type WsIncomingEmitterOutConfig = ApplyConfigKeys<ConfigWsToEmitter>

export type EmitterIncomingWsOutConfig = ApplyConfigKeys<ConfigEmitterToWs>

export type WsMixedEventHandlerConfig =
  | WsIncomingEmitterOutConfig
  | EmitterIncomingWsOutConfig
