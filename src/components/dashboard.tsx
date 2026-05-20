import {
  ArrowRight,
  FileChartColumn,
  Plus,
  Presentation,
  WandSparkles,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  SLIDE_STYLES,
  TONE_OPTIONS,
  LAYOUT_OPTIONS,
} from '../features/presentation/constant/presentation-options'
import { Slider } from './ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useState } from 'react'
import { PRESENTATION_TEMPLATES } from '../features/presentation/constant/presentation-template'
import type { DashboardFormState } from '#/features/presentation/types/dashboard-form-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPresentation } from '#/features/presentation/actions/presentation-mutation'
import { toast } from 'sonner'
import { presentationQueryKeys } from '#/features/presentation/hooks/query-keys'
import { useNavigate } from '@tanstack/react-router'

export function DashboardSection() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [form, setForm] = useState<DashboardFormState>({
    content: '',
    slideCount: 8,
    style: 'minimal',
    tone: 'formal',
    layout: 'balanced',
  })
  const [slideCount, setSlideCount] = useState<number[]>([10])
  const templates = PRESENTATION_TEMPLATES

  const createMut = useMutation({
    mutationFn: () =>
      createPresentation({
        data: {
          prompt: form.content.trim(),
          slideCount: form.slideCount,
          style: form.style,
          tone: form.tone,
          layout: form.layout,
        },
      }),
    onSuccess: (presentation) => {
      toast.success('Presentation Created')
      queryClient.invalidateQueries({ queryKey: presentationQueryKeys.list() })
      navigate({
        to: '/presentations/$presentationId',
        params: { presentationId: presentation.id },
      })
    },
    onError: (error) => {
      toast.error(error.message || 'Could not find presentation')
    },
  })

  const handleCreate = () => {
    if (!form.content.trim()) {
      toast.error('Please enter your content first')
      return
    }
    createMut.mutate()
  }
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Main Heading  */}

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
        {/* TextArea for Prompt  */}

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
              value={form.content}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  content: e.target.value,
                }))
              }
              className="min-h-55 w-full resize-none rounded-2xl border border-border bg-background px-5 py-4 text-sm outline-none transition focus:border-primary"
            />

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                AI will generate slides, titles, and structure.
              </p>

              <Button
                onClick={handleCreate}
                disabled={createMut.isPending || !form.content.trim()}
                className="h-11 rounded-2xl px-6"
              >
                Generate PPT
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Export Section  */}
          {/* <div className="space-y-6"> */}
          {/* <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl">
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
            </div> */}

          {/* Presentation Settings  */}
          <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Presentation Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Customize your AI-generated presentation
                </p>
              </div>

              <Presentation className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="grid gap-6 md:grid-cols-1">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Slide Style</label>

                <Select
                  value={form.style}
                  onValueChange={(value) =>
                    setForm((s) => ({
                      ...s,
                      style: value as DashboardFormState['style'],
                    }))
                  }
                >
                  <SelectTrigger className="h-11 rounded-2xl border-border bg-background">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>

                  <SelectContent>
                    {SLIDE_STYLES.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>

                <Select
                  value={form.tone}
                  onValueChange={(value) =>
                    setForm((s) => ({
                      ...s,
                      tone: value as DashboardFormState['tone'],
                    }))
                  }
                >
                  <SelectTrigger className="h-11 rounded-2xl border-border bg-background">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>

                  <SelectContent>
                    {TONE_OPTIONS.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Layout</label>

                <Select
                  value={form.layout}
                  onValueChange={(value) =>
                    setForm((s) => ({
                      ...s,
                      layout: value as DashboardFormState['layout'],
                    }))
                  }
                >
                  <SelectTrigger className="h-11 rounded-2xl border-border bg-background">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>

                  <SelectContent>
                    {LAYOUT_OPTIONS.map((layout) => (
                      <SelectItem key={layout.value} value={layout.value}>
                        {layout.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Slides Quantity  */}
            <div className="pt-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Number of Slides
                  </label>

                  <span className="text-sm text-muted-foreground">
                    {slideCount[0]} slides
                  </span>
                </div>

                <Slider
                  defaultValue={[10]}
                  max={20}
                  min={5}
                  step={1}
                  value={slideCount}
                  onValueChange={(value) => {
                    setSlideCount(value)

                    setForm((s) => ({
                      ...s,
                      slideCount: value[0],
                    }))
                  }}
                />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>

        {/* Presentation Templates  */}
        <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl">
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Presentation Templates</h3>

                <p className="text-xs text-muted-foreground">
                  Start quickly with AI-ready prompts
                </p>
              </div>

              <Presentation className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex flex-wrap gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => {
                    setForm({
                      content: template.content,

                      slideCount: template.slides,

                      style: template.style,

                      tone: template.tone,

                      layout: template.layout,
                    })
                    setSlideCount([template.slides])
                  }}
                  className="group rounded-2xl border border-border bg-background px-4 py-3 text-left transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileChartColumn className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">{template.label}</p>

                      <p className="text-xs text-muted-foreground">
                        {template.slides} slides
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Recent Presentations  */}
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
