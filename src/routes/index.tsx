import { createFileRoute } from '@tanstack/react-router'
import Header from '#/components/heroSection'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
    </main>
  )
}
