import {
  SLIDE_STYLES,
  TONE_OPTIONS,
  LAYOUT_OPTIONS,
} from '../constant/presentation-options'
export type DashboardFormState = {
  content: string
  slideCount: number
  style: (typeof SLIDE_STYLES)[number]['value']
  tone: (typeof TONE_OPTIONS)[number]['value']
  layout: (typeof LAYOUT_OPTIONS)[number]['value']
}
