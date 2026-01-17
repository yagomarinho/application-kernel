import { EventHandler } from '../../messaging'
import { WithAdapter } from '../composition'
import { WsEngine } from '../engine'
import { WsEventHandlerConfig } from './ws.event.handler.config'

export interface WsEventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  Env = unknown,
>
  extends
    EventHandler<RawInput, GuardInput, Input, Output, Env>,
    WithAdapter<RawInput> {}

export function WsEventHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  Env = unknown,
>({
  input,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  incomingAdapter,
}: WsEventHandlerConfig<RawInput, GuardInput, Input, Output, Env>) {
  return (engine: WsEngine) =>
    engine.mount({
      input,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      incomingAdapter,
    })
}
