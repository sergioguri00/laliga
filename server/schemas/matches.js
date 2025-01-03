import { z } from 'zod'

const matchSchema = z.object({
  matchdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  localTeam: z.string({
    invalid_type_error: 'Local team must be a string',
    required_error: 'Local team is required'
  }),
  awayTeam: z.string({
    invalid_type_error: 'Away team must be a string',
    required_error: 'Away team is required'
  }),
  stadium: z.number().int().positive(),
  matchday: z.number().int().positive()
})

export function validateMatch (input) {
  return matchSchema.safeParse(input)
}
