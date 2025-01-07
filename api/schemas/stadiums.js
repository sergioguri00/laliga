import { z } from 'zod'
const startsWithUppercase = (value) => /^[A-ZÁÉÍÓÚÑÜ]/.test(value)

const stadiumSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }).refine(startsWithUppercase, {
    message: 'Name must start with an uppercase letter'
  }),
  year: z.number().int().min(1865).max(2025),
  latitude: z.number()
    .min(-90, { message: 'Latitude must be greater or equal -90' })
    .max(90, { message: 'Latitude must be less or equal 90' }),
  longitude: z.number()
    .min(-180, { message: 'Longitude must be greater or equal -180' })
    .max(180, { message: 'Longitude must be less or equal 180' }),
  capacity: z.number().int().min(0).max(150000),
  photo: z.string().url({
    message: 'Photo must be a valid URL'
  }).nullable(),
  team_id: z.number().int().positive()
})

export function validateStadium (input) {
  return stadiumSchema.safeParse(input)
}

export function validatePartialStadium (input) {
  return stadiumSchema.partial().safeParse(input)
}
