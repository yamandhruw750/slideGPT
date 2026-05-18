import { DashboardSection } from '#/components/dashboard'
import { getSession } from '#/lib/auth.function'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: DashboardPage,
})

function DashboardPage() {
  return <DashboardSection />
}
