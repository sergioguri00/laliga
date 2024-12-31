import { z } from 'zod'
const startsWithUppercase = (value) => /^[A-ZÁÉÍÓÚÑÜ]/.test(value)

const playerSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }).refine(startsWithUppercase, {
    message: 'Name must start with an uppercase letter'
  }),
  lastName: z.string({
    invalid_type_error: 'Last name must be a string',
    required_error: 'Last name is required'
  }).refine(startsWithUppercase, {
    message: 'Last name must start with an uppercase letter'
  }),
  number: z.number().int().min(1).max(99),
  height: z.number().int().min(100).max(250),
  country: z.string({
    invalid_type_error: 'Country must be a string',
    required_error: 'Country is required'
  }).refine(startsWithUppercase, {
    message: 'Country must start with an uppercase letter'
  }),
  position: z.enum(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'], {
    required_error: 'Position is required',
    invalid_type_error: 'Position must be one of Goalkeeper, Defender, Midfielder, Forward'
  }),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  photo: z.string().url({
    message: 'Poster must be a valid URL'
  }).nullable(),
  team: z.number().int().positive()
})

export function validatePlayer (input) {
  return playerSchema.safeParse(input)
}

export function validatePartialPlayer (input) {
  return playerSchema.partial().safeParse(input)
}
