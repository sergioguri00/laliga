import { z } from 'zod'
const startsWithUppercase = (value) => /^[A-ZÁÉÍÓÚÑÜ]/.test(value)

const matchSchema = z.object({
  matchdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  localTeam: z.string({
    invalid_type_error: 'Local team must be a string',
    required_error: 'Local team is required'
  }).refine(startsWithUppercase, {
    message: 'Local team must start with an uppercase letter'
  }),
  awayTeam: z.string({
    invalid_type_error: 'Away team must be a string',
    required_error: 'Away team is required'
  }).refine(startsWithUppercase, {
    message: 'Away team must start with an uppercase letter'
  }),
  stadium: z.number().int().positive(),
  matchday: z.number().int().positive()
})

export function validateMatch (input) {
  return matchSchema.safeParse(input)
}
