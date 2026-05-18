import {
  ArrowRight,
  Download,
  FileChartColumn,
  Plus,
  Presentation,
  WandSparkles,
} from 'lucide-react'
import { Button } from './ui/button'

export function DashboardSection() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Generate beautiful AI-powered presentations instantly.
            </p>
          </div>

          <Button className="h-11 rounded-2xl px-6">
            <Plus className="mr-2 h-4 w-4" />
            New Presentation
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <WandSparkles className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Create Presentation</h2>
                <p className="text-sm text-muted-foreground">
                  Describe your presentation topic.
                </p>
              </div>
            </div>

            <textarea
              placeholder="Create a modern presentation about AI in education..."
              className="min-h-55 w-full resize-none rounded-2xl border border-border bg-background px-5 py-4 text-sm outline-none transition focus:border-primary"
            />

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                AI will generate slides, titles, and structure.
              </p>

              <Button className="h-11 rounded-2xl px-6">
                Generate PPT
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Exports</h3>
                <Download className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                {['PowerPoint (.pptx)', 'PDF Export', 'Share Presentation'].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3"
                    >
                      <span className="text-sm">{item}</span>
                      <Button size="sm" variant="secondary">
                        Export
                      </Button>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Templates</h3>
                <Presentation className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Modern', 'Minimal', 'Startup', 'Education'].map(
                  (template) => (
                    <button
                      key={template}
                      className="rounded-2xl border border-border bg-background px-4 py-5 text-sm font-medium transition hover:border-primary hover:bg-muted"
                    >
                      {template}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Presentations</h2>
              <p className="text-sm text-muted-foreground">
                Your recently generated AI slide decks.
              </p>
            </div>

            <Button variant="outline" className="rounded-2xl">
              View All
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              'AI in Healthcare',
              'Future of Education',
              'Startup Pitch Deck',
            ].map((presentation) => (
              <div
                key={presentation}
                className="group rounded-3xl border border-border bg-background p-5 transition hover:border-primary"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileChartColumn className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold">{presentation}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  AI-generated presentation with modern layouts and visuals.
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Updated 2h ago
                  </span>

                  <Button size="sm" variant="secondary">
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
