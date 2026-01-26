// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface EnvironmentKey<T> {
  readonly id: symbol
}

export function createEnvironmentKey<T>(key: string): EnvironmentKey<T> {
  return {
    id: Symbol(key),
  }
}
