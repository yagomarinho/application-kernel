import type { Resolvable } from '@yagomarinho/domain-kernel'

export function bindResolvableArray<T>(
  resolvableArray: Resolvable<T>[],
): Resolvable<T[]> {
  return resolvableArray.reduce(
    (arr, resolvable) => {
      if (resolvable instanceof Promise) {
        return resolvable.then(bindValue(arr))
      }
      return bindValue(arr)(resolvable)
    },
    [] as Resolvable<T[]>,
  )
}

function bindValue<T>(arr: Resolvable<T[]>) {
  return (value: T): Resolvable<T[]> => {
    if (arr instanceof Promise) return arr.then(a => a.concat(value))
    return arr.concat(value)
  }
}
