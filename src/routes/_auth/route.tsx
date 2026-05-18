import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="min-h-screen w-full">
        
      <Outlet />
    </div>
  )
}
