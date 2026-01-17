import { CommandHandler } from '../../messaging'
import { WithAdapter } from '../composition'
import { WsEngine } from '../engine'
import { WsCommandHandlerConfig } from './ws.command.handler.config'

export interface WsCommandHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  FinalOutput = Output,
  Env = unknown,
>
  extends
    CommandHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    WithAdapter<RawInput> {}

export function WsCommandHandler<
  RawInput = unknown,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = unknown,
  FinalOutput = Output,
  Env = unknown,
>({
  input,
  output,
  middlewares,
  guardian,
  handler,
  postprocessors,
  onError,
  env,
  incomingAdapter,
}: WsCommandHandlerConfig<
  RawInput,
  GuardInput,
  Input,
  Output,
  FinalOutput,
  Env
>) {
  return (engine: WsEngine) =>
    engine.mount({
      input,
      output,
      middlewares,
      guardian,
      handler,
      postprocessors,
      onError,
      env,
      incomingAdapter,
    })
}
