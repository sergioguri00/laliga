import { z } from 'zod'
const startsWithUppercase = (value) => /^[A-ZÁÉÍÓÚÑÜ]/.test(value)

const managerSchema = z.object({
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
  country: z.string({
    invalid_type_error: 'Country must be a string',
    required_error: 'Country is required'
  }).refine(startsWithUppercase, {
    message: 'Country must start with an uppercase letter'
  }),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  photo: z.string().url({
    message: 'Photo must be a valid URL'
  }).nullable(),
  team_id: z.number().int().positive()
})

export function validateManager (input) {
  return managerSchema.safeParse(input)
}

export function validatePartialManager (input) {
  return managerSchema.partial().safeParse(input)
}
