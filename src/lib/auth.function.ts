import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { redirect } from '@tanstack/react-router'
import { auth } from './auth'
import { AUTH_LOGIN_PATH } from './auth-paths'

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()

    return await auth.api.getSession({ headers })
  },
)

export const ensureSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()

    const session = await auth.api.getSession({ headers })
    if (!session) throw redirect({ to: AUTH_LOGIN_PATH })

    return session
  },
)
