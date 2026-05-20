import { createServerFn } from '@tanstack/react-start'
import { presentationIdInputSchema } from '../types/schema'
import { prisma } from '#/lib/db'
import { requirePresentationUserId } from '../lib/server-helper'

export const listPresentations = createServerFn({ method: 'GET' }).handler(
  async () => {
    const userId = await requirePresentationUserId()
    return prisma.presentation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    })
  },
)

export const getPresentation = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => presentationIdInputSchema.parse(data))
  .handler(async ({ data }) => {
    const userId = await requirePresentationUserId()
    const row = await prisma.presentation.findFirst({
      where: { id: data.id, userId },
    })
    if (!row) throw new Error('Not found')
    return row
  })

export const getPresentationWithSlides = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => presentationIdInputSchema.parse(data))
  .handler(async ({ data }) => {
    const userId = await requirePresentationUserId()
    const row = await prisma.presentation.findFirst({
      where: { id: data.id, userId },
      include: {
        slides: {
          orderBy: { order: 'asc' },
        },
      },
    })
    if (!row) throw new Error('Not found')
    return row
  })
