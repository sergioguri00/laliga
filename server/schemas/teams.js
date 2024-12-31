import { z } from 'zod'
const startsWithUppercase = (value) => /^[A-ZÁÉÍÓÚÑÜ]/.test(value)
const isHexColor = (value) => /^#[0-9A-Fa-f]{6}$/.test(value)

const teamSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }).refine(startsWithUppercase, {
    message: 'Name must start with an uppercase letter'
  }),
  year: z.number().int().min(1865).max(2022),
  website: z.string().url({
    message: 'Website must be a valid URL'
  }).nullable(),
  president: z.string({
    invalid_type_error: 'President must be a string',
    required_error: 'President is required'
  }).refine(startsWithUppercase, {
    message: 'President must start with an uppercase letter'
  }),
  badge: z.string().url({
    message: 'Badge must be a valid URL'
  }),
  city: z.string({
    invalid_type_error: 'City must be a string',
    required_error: 'City is required'
  }).refine(startsWithUppercase, {
    message: 'City must start with an uppercase letter'
  }),
  mainColor: z.string({
    invalid_type_error: 'Main color must be a string',
    required_error: 'Main color is required'
  }).refine(isHexColor, {
    message: 'Main color must be a valid hex color'
  }),
  secondaryColor: z.string({
    invalid_type_error: 'Secondary color must be a string',
    required_error: 'Secondary color is required'
  }).refine(isHexColor, {
    message: 'Secondary color must be a valid hex color'
  })
})

export function validateTeam (input) {
  return teamSchema.safeParse(input)
}

export function validatePartialTeam (input) {
  return teamSchema.partial().safeParse(input)
}
