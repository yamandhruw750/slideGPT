import { Button } from '#/components/ui/button'
import { GenerationStatus } from '#/features/presentation/components/generation-status'
import { usePresentationDetail } from '#/features/presentation/hooks/use-presentation-detail'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Play,
  RefreshCw,
  Save,
  Trash2,
} from 'lucide-react'
import { Label } from '#/components/ui/label'
import { useCallback, useState } from 'react'
import { Textarea } from '#/components/ui/textarea'
import { Slider } from '#/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {
  LAYOUT_OPTIONS,
  SLIDE_STYLES,
  TONE_OPTIONS,
} from '#/features/presentation/constant/presentation-options'
import { presentationThumbnailUrl } from '#/features/presentation/utils/thumbnail-url'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#/components/ui/alert-dialog'
import { SlideCard } from '#/features/presentation/components/slide-card'
import { SlideshowModal } from '#/features/presentation/components/slideshow-modal'
import { useFullscreen } from '#/features/presentation/hooks/use-fullscreen'
import { SlidePreview } from '#/features/presentation/components/slide-preview'
import { exportToPptx } from '#/features/presentation/utils'
import { toast } from 'sonner'

export const Route = createFileRoute('/presentations/$presentationId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { presentationId } = Route.useParams()
  const navigate = useNavigate()
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const { isFullscreen, toggleFullscreen } = useFullscreen(
    'slide-preview-container',
  )

  const {
    query,
    slides,
    isGenerating,
    updatedLabel,
    form,
    setForm,
    updateMut,
    regenerateMut,
    deleteMut,
  } = usePresentationDetail(presentationId, {
    onDeleted: () => navigate({ to: '/' }),
  })

  const handleExportPptx = useCallback(async () => {
    const data = query.data
    if (!data) return
    const slidesToExport = slides
    if (slidesToExport.length === 0) return

    setIsExporting(true)
    try {
      const filename = await exportToPptx({
        title: data.title,
        slides: slidesToExport,
      })
      toast.success(`Exported as ${filename}`)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Export failed')
    } finally {
      setIsExporting(false)
    }
  }, [query.data, slides])

  if (query.isPending) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-muted-foreground">
          Loading presentation…
        </div>
      </main>
    )
  }

  if (query.isError) {
    const error = query.error
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <p className="text-destructive">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </main>
    )
  }

  const data = query.data
  const thumb = presentationThumbnailUrl(data?.id!)
  const activeSlide = slides.at(activeSlideIndex)

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-2xl gap-1"
            >
              <Link to="/dashboard">
                <ArrowLeft className="size-4" />
                Home
              </Link>
            </Button>

            <GenerationStatus status={data?.status!} />
          </div>

          <span className="text-sm text-muted-foreground">
            Updated {updatedLabel}
          </span>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-6">
            {/* Header Card */}

            <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={thumb}
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-2xl border border-border bg-background"
                />

                <div className="min-w-0 flex-1">
                  <h1 className="truncate text-xl font-semibold">
                    {data?.title!}
                  </h1>

                  <p className="text-sm text-muted-foreground">
                    {slides.length} slides
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {slides.length > 0 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-2xl gap-1"
                        onClick={() => setShowSlideshow(true)}
                      >
                        <Play className="size-4" />

                        <span className="hidden sm:inline">Slideshow</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-2xl gap-1"
                        onClick={handleExportPptx}
                        disabled={isExporting}
                      >
                        <Download className="size-4" />

                        <span className="hidden sm:inline">
                          {isExporting ? 'Exporting…' : 'Export'}
                        </span>
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-2xl gap-1"
                    disabled={regenerateMut.isPending || isGenerating}
                    onClick={() => regenerateMut.mutate()}
                  >
                    <RefreshCw
                      className={`size-4 ${isGenerating ? 'animate-spin' : ''}`}
                    />

                    <span className="hidden sm:inline">
                      {isGenerating ? 'Generating…' : 'Regenerate'}
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-2xl"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    {showSettings ? 'Hide settings' : 'Edit settings'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Settings */}

            {showSettings && (
              <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pres-title" className="text-sm font-medium">
                    Title
                  </Label>

                  <input
                    id="pres-title"
                    value={form.title}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,

                        title: e.target.value,
                      }))
                    }
                    className="flex h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Prompt</Label>

                  <Textarea
                    value={form.prompt}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,

                        prompt: e.target.value,
                      }))
                    }
                    className="min-h-35 resize-y rounded-2xl border-border bg-background text-sm"
                  />
                </div>

                <div className="grid gap-5 lg:grid-cols-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Slides: {form.slideCount}
                    </Label>

                    <Slider
                      value={[form.slideCount]}
                      onValueChange={([v]) =>
                        setForm((s) => ({
                          ...s,

                          slideCount: v,
                        }))
                      }
                      min={3}
                      max={20}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Style</Label>

                    <Select
                      value={form.style}
                      onValueChange={(value) =>
                        setForm((s) => ({
                          ...s,

                          style:
                            value as (typeof SLIDE_STYLES)[number]['value'],
                        }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-2xl border-border bg-background">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="rounded-2xl border-border bg-card">
                        {SLIDE_STYLES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tone</Label>

                    <Select
                      value={form.tone}
                      onValueChange={(value) =>
                        setForm((s) => ({
                          ...s,

                          tone: value as (typeof TONE_OPTIONS)[number]['value'],
                        }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-2xl border-border bg-background">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="rounded-2xl border-border bg-card">
                        {TONE_OPTIONS.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Layout</Label>

                    <Select
                      value={form.layout}
                      onValueChange={(value) =>
                        setForm((s) => ({
                          ...s,

                          layout:
                            value as (typeof LAYOUT_OPTIONS)[number]['value'],
                        }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-2xl border-border bg-background">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="rounded-2xl border-border bg-card">
                        {LAYOUT_OPTIONS.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* AlertBox  */}

                <div className="flex flex-wrap justify-between gap-3 pt-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="rounded-xl gap-2"
                        disabled={deleteMut.isPending}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="glass">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete presentation?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your presentation and all its slides.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => deleteMut.mutate()}
                        >
                          {deleteMut.isPending ? 'Deleting…' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    type="button"
                    size="sm"
                    className="rounded-xl gap-2"
                    disabled={
                      updateMut.isPending ||
                      !form.title.trim() ||
                      !form.prompt.trim()
                    }
                    onClick={() => updateMut.mutate()}
                  >
                    <Save className="size-4" />
                    {updateMut.isPending ? 'Saving…' : 'Save changes'}
                  </Button>
                </div>
              </div>
            )}
            {activeSlide && (
              <div className="space-y-3">
                <div id="slide-preview-container" className="relative group">
                  <SlidePreview
                    slide={activeSlide}
                    isFullscreen={isFullscreen}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`absolute top-3 right-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                      isFullscreen ? 'opacity-100' : ''
                    }`}
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="size-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-1"
                    disabled={activeSlideIndex === 0}
                    onClick={() =>
                      setActiveSlideIndex((i) => Math.max(0, i - 1))
                    }
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {activeSlideIndex + 1} / {slides.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-1"
                    disabled={activeSlideIndex >= slides.length - 1}
                    onClick={() =>
                      setActiveSlideIndex((i) =>
                        Math.min(slides.length - 1, i + 1),
                      )
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
            {slides.length === 0 && !isGenerating && (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No slides yet. Click "Regenerate" to create slides from your
                  prompt.
                </p>
                <Button
                  className="rounded-xl gap-2"
                  onClick={() => regenerateMut.mutate()}
                  disabled={regenerateMut.isPending}
                >
                  <RefreshCw className="size-4" />
                  Generate slides
                </Button>
              </div>
            )}
            {slides.length === 0 && isGenerating && (
              <div className="glass rounded-2xl p-12 text-center">
                <RefreshCw className="size-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">
                  Generating your presentation…
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This may take a minute
                </p>
              </div>
            )}
          </div>
          {slides.length > 0 && (
            <aside className="lg:w-80 xl:w-96 flex flex-col">
              <h2 className="font-medium text-sm px-2 pb-3 text-muted-foreground">
                Slides
              </h2>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pr-2 -mr-2 space-y-4 max-h-[calc(100vh-14rem)]">
                {slides.map((slide, i) => (
                  <SlideCard
                    key={slide.id}
                    slide={slide}
                    isActive={i === activeSlideIndex}
                    onClick={() => setActiveSlideIndex(i)}
                  />
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
      {showSlideshow && (
        <SlideshowModal
          slides={slides}
          initialIndex={activeSlideIndex}
          onClose={() => setShowSlideshow(false)}
        />
      )}
    </main>
  )
}
