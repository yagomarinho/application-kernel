import { WsEventHandler } from './ws.event.handler'

type RequiredKeys = 'input' | 'handler'

export type WsEventHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  Env = any,
> = Partial<
  Omit<WsEventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
> &
  Pick<WsEventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
