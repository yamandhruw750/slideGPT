import { Button } from '@/components/ui/button'
import { authClient } from '#/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, FileChartColumn, Sparkles } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  const handleStartCreating = async () => {
    const session = await authClient.getSession()
    if (session.data?.user) {
      navigate({ to: '/dashboard' })
    } else {
      navigate({ to: '/login' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_42%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-4 py-2 backdrop-blur-xl dark:bg-white/5"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            AI-powered presentation generator
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-2xl">
              <FileChartColumn className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              SlideGPT
            </h1>
          </div>

          <h2 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Turn prompts into
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent dark:from-white dark:to-zinc-500">
              {' '}
              beautiful slides
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Generate stunning AI-powered presentations instantly. From ideas to
            polished slides in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            className="h-12 rounded-2xl px-8"
            onClick={handleStartCreating}
          >
            Start Creating
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline" className="h-12 rounded-2xl px-8">
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid gap-4 md:grid-cols-3"
        >
          {['AI-generated slides', 'Export as PPT', 'Modern templates'].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card/80 px-6 py-4 backdrop-blur-xl dark:bg-white/5"
              >
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}
