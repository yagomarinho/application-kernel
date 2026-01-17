import type { EventHandler } from './event.handler'

type RequiredKeys = 'input' | 'handler'

export type EventHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  Env = any,
> = Partial<
  Omit<EventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
> &
  Pick<EventHandler<RawInput, GuardInput, Input, Output, Env>, RequiredKeys>
