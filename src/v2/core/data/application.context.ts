import type { ExecutionContext } from '@yagomarinho/domain-kernel'

export type ApplicationContext<
  T extends Record<string, any> = Record<string, any>,
> = Partial<ExecutionContext> & T
