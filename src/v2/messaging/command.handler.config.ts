import type { CommandHandler } from './command.handler'

type RequiredKeys = 'input' | 'output' | 'handler'

export type CommandHandlerConfig<
  RawInput = any,
  GuardInput = RawInput,
  Input = GuardInput,
  Output = any,
  FinalOutput = Output,
  Env = any,
> = Partial<
  Omit<
    CommandHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
> &
  Pick<
    CommandHandler<RawInput, GuardInput, Input, Output, FinalOutput, Env>,
    RequiredKeys
  >
