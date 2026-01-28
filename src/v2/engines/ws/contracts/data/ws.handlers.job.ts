import type { WsCommandJob } from './ws.command.job'
import type { WsEventJob } from './ws.event.job'
import type { WsMixedInOutJob } from './ws.mixed.in.out/ws.mixed.in.out.job'

export type WsHandlersJob = WsEventJob | WsCommandJob | WsMixedInOutJob
