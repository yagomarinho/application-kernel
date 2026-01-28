import type { Resolvable } from '@yagomarinho/domain-kernel'
import type { ApplicationContext } from '../../../../core'
import type { Audience } from '../ports'

export interface AudienceResolver {
  (
    audience: Audience[],
    env: any,
    ctx: ApplicationContext,
  ): Resolvable<Audience[]>
}
