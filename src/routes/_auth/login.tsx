import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { FileChartColumn } from 'lucide-react'
import LoginForm from '#/components/auth/loginForm'
import { z } from 'zod'
import { getSession } from '#/lib/auth.function'

export const Route = createFileRoute('/_auth/login')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()
    if (session) {
      throw redirect({ to: '/', search: { redirect: location.href } })
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { redirect: redirectTo } = Route.useSearch()
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="glass rounded-3xl p-8 space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <Link to="/" className="no-underline">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
                <FileChartColumn className="h-10 w-10" />
              </div>
            </Link>
            <div className="text-center">
              <h1 className="font-bold text-2xl">
                Welcome to <span className="text-primary">SlideGPT</span>
              </h1>
              <p>Sign in to create beautiful Presentation</p>
            </div>
          </div>
          {/* Login form */}
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  )
}
