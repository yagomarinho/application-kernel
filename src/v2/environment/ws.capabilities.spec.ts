describe('wsCapabilities', () => {
  const createJob = (overrides = {}) => ({
    id: 'job-1',
    tag: 'ws',
    ...overrides,
  })

  const createExecution = (): Execution => ({ id: 'exec-1' }) as any
  const createAudience = (id: string): Audience => ({ id }) as any

  it('throws if trying to register audience for unknown job', () => {
    const env = createAmbient()
    const ws = wsCapabilities(env)

    const job = createJob()

    expect(() =>
      ws.audiences.register({ job, audience: createAudience('a1') }),
    ).toThrow('Job not founded to register assignment')
  })

  it('throws if trying to resolve audience for unknown job', () => {
    const env = createAmbient()
    const ws = wsCapabilities(env)

    expect(() => ws.audiences.resolve(createJob())).toThrow(
      'Job not founded to resolve audience',
    )
  })

  it('throws if trying to resolve audience for unknown job', () => {
    const env = createAmbient()
    const ws = wsCapabilities(env)

    expect(() => ws.audiences.resolve(createJob())).toThrow(
      'Job not founded to resolve audience',
    )
  })

  it('registers audience for an existing job', () => {
    const env = createAmbient()

    const globals = createApplicationView(env)
    const ws = wsCapabilities(env)

    const job = createJob()
    const execution = createExecution()
    const audience = createAudience('a1')

    globals.compilation.attach({ job, execution })

    ws.audiences.register({ job, audience })

    const map = env.get(audienceKey)

    expect(map).toBeInstanceOf(Map)
    expect(map?.get(job.id)).toEqual([audience])
  })

  it('supports multiple audiences for the same job', () => {
    const env = createAmbient()

    const globals = createApplicationView(env)
    const ws = wsCapabilities(env)

    const job = createJob()

    globals.compilation.attach({ job, execution: createExecution() })

    ws.audiences.register({ job, audience: createAudience('a1') })
    ws.audiences.register({ job, audience: createAudience('a2') })

    expect(ws.audiences.resolve(job).map(a => (a as any).id)).toEqual([
      'a1',
      'a2',
    ])
  })

  it('isolates audiences by job id', () => {
    const env = createAmbient()

    const globals = createApplicationView(env)
    const ws = wsCapabilities(env)

    const job1 = { id: '1', tag: 'ws' }
    const job2 = { id: '2', tag: 'ws' }

    globals.compilation.attach({ job: job1, execution: createExecution() })
    globals.compilation.attach({ job: job2, execution: createExecution() })

    ws.audiences.register({ job: job1, audience: createAudience('a1') })

    expect(ws.audiences.resolve(job1).length).toBe(1)
    expect(ws.audiences.resolve(job2)).toEqual([])
  })

  it('returns the same audience array reference on resolve', () => {
    const env = createAmbient()

    const globals = createApplicationView(env)
    const ws = wsCapabilities(env)

    const job = createJob()

    globals.compilation.attach({ job, execution: createExecution() })

    ws.audiences.register({ job, audience: createAudience('a1') })

    const first = ws.audiences.resolve(job)
    const second = ws.audiences.resolve(job)

    expect(first).toBe(second)
  })
})
