import { WsCommandHandler } from './ws.command.handler'

type RequiredKeys = 'input' | 'output' | 'handler'

export type WsCommandHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
> = Partial<
  Omit<
    WsCommandHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
> &
  Pick<
    WsCommandHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
