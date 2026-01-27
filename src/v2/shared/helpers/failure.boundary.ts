import { Failure } from '@yagomarinho/domain-kernel'

type AddingFailureTo<A> =
  A extends Promise<infer B> ? Promise<B | Failure> : A | Failure

function encapsulateError(err: any) {
  return Failure(err)
}

export function failureBoundary<F extends (...args: any[]) => any>(fn: F) {
  return (...args: Parameters<F>): AddingFailureTo<ReturnType<F>> => {
    try {
      const result = fn(...args)
      if (result instanceof Promise)
        return result.catch(encapsulateError) as any
      return result
    } catch (err: any) {
      return encapsulateError(err) as any
    }
  }
}
