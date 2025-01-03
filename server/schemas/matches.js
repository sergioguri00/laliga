import { z } from 'zod'

const matchSchema = z.object({
  matchdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  localTeam: z.number().int().positive(),
  awayTeam: z.number().int().positive(),
  stadium: z.number().int().positive(),
  matchday: z.number().int().positive()
})

export function validateMatch (input) {
  return matchSchema.safeParse(input)
}
