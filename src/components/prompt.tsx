import {
  SLIDE_STYLES,
  TONE_OPTIONS,
  LAYOUT_OPTIONS,
} from '../features/presentation/constant/presentation-options'

import { ArrowRight, WandSparkles } from 'lucide-react'
import { Button } from './ui/button'

export function PromptSection() {
  return (
    <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <WandSparkles className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Create Presentation</h2>

          <p className="text-sm text-muted-foreground">
            Generate AI-powered slides instantly.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Presentation Prompt</label>

          <textarea
            placeholder="Create a presentation about the future of artificial intelligence..."
            className="min-h-52 w-full resize-none rounded-2xl border border-border bg-background px-5 py-4 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Slide Style</label>

            <select className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none">
              {SLIDE_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tone</label>

            <select className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none">
              {TONE_OPTIONS.map((tone) => (
                <option key={tone.value} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Layout</label>

            <select className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none">
              {LAYOUT_OPTIONS.map((layout) => (
                <option key={layout.value} value={layout.value}>
                  {layout.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            AI will generate slides, structure, and content.
          </p>

          <Button className="h-11 rounded-2xl px-6">
            Generate PPT
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
