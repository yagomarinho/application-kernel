import type { Compilation } from '../../../../core'
import type { HttpJob } from '../data'
import type { HttpRequest, HttpResponse } from '../ports'

export type HttpCompilation = Compilation<HttpJob, HttpRequest, HttpResponse>
