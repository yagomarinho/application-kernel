import type { ApplicationService, ServiceDefaults } from '../../contracts'
import type { Middleware, Guardian, Postprocessor } from '../../../../core'

import { type UseCase, Result } from '@yagomarinho/domain-kernel'
import { declareApplicationService } from '../declare'

describe('declareApplicationService', () => {
  it('uses defaults when optional fields are not provided', () => {
    const defaults: ServiceDefaults = {
      env: env => ({ ...env, scoped: true }),
      middlewares: [],
      guardian: input => input as any,
      postprocessors: [],
      onError: () => {
        throw new Error('should not be called')
      },
    }

    const declare = declareApplicationService({ defaults })

    const handler = input => input

    const service = declare({
      handler,
    })

    expect(service).toEqual<ApplicationService>({
      env: defaults.env,
      middlewares: defaults.middlewares,
      guardian: defaults.guardian,
      handler,
      postprocessors: defaults.postprocessors,
      onError: defaults.onError,
    })
  })

  it('overrides defaults when explicit values are provided', () => {
    const defaultEnv = (env: any) => env
    const customEnv = (env: any) => ({ ...env, custom: true })

    const defaultGuardian: Guardian = input => input as any
    const customGuardian: Guardian = input =>
      ({ ...input, guarded: true }) as any

    const defaults: ServiceDefaults = {
      env: defaultEnv,
      middlewares: [],
      guardian: defaultGuardian,
      postprocessors: [],
      onError: () => {
        throw new Error('should not be called')
      },
    }

    const declare = declareApplicationService({ defaults })

    const handler = input => input

    const service = declare({
      env: customEnv,
      guardian: customGuardian,
      handler,
    })

    expect(service.env).toBe(customEnv)
    expect(service.guardian).toBe(customGuardian)
    expect(service.middlewares).toBe(defaults.middlewares)
    expect(service.postprocessors).toBe(defaults.postprocessors)
    expect(service.onError).toBe(defaults.onError)
  })

  it('allows overriding middlewares and postprocessors independently', () => {
    const defaultMiddleware: Middleware = input => input as any
    const customMiddleware: Middleware = input => input as any

    const defaultPost: Postprocessor = input => input as any
    const customPost: Postprocessor = input => input as any

    const defaults: ServiceDefaults = {
      env: env => env,
      middlewares: [defaultMiddleware],
      guardian: input => input as any,
      postprocessors: [defaultPost],
      onError: () => {
        throw new Error('should not be called')
      },
    }

    const declare = declareApplicationService({ defaults })

    const handler = input => input

    const service = declare({
      middlewares: [customMiddleware],
      postprocessors: [customPost],
      handler,
    })

    expect(service.middlewares).toEqual([customMiddleware])
    expect(service.postprocessors).toEqual([customPost])
  })

  it('requires handler and always includes it in the ApplicationService', () => {
    const defaults: ServiceDefaults = {
      env: env => env,
      middlewares: [],
      guardian: input => input as any,
      postprocessors: [],
      onError: () => {
        throw new Error('should not be called')
      },
    }

    const declare = declareApplicationService({ defaults })

    const handler: UseCase = input => Result.ok({ handled: input })

    const service = declare({ handler })

    expect(service.handler).toBe(handler)
  })

  it('returns a new ApplicationService object on each call', () => {
    const defaults: ServiceDefaults = {
      env: env => env,
      middlewares: [],
      guardian: input => input as any,
      postprocessors: [],
      onError: () => {
        throw new Error('should not be called')
      },
    }

    const declare = declareApplicationService({ defaults })

    const handler = input => input

    const service1 = declare({ handler })
    const service2 = declare({ handler })

    expect(service1).not.toBe(service2)
    expect(service1).toEqual(service2)
  })
})
