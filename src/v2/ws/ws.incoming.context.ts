export interface WsIncomingContext<S = any> {
  endpoint: string
  headers: Record<string, string>
  query: Record<string, string>
  body: unknown
  socket: S
}
