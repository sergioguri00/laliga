import { z } from 'zod'
const startsWithUppercase = (value) => /^[A-ZÁÉÍÓÚÑÜ]/.test(value)

const matchEventSchema = z.object({
  player: z.string({
    invalid_type_error: 'Player must be a string',
    required_error: 'Player is required'
  }).refine(startsWithUppercase, {
    message: 'Player must start with an uppercase letter'
  }),
  type: z.enum(['Substitution', 'YellowCard', 'RedCard', 'Goal'], {
    required_error: 'Position is required',
    invalid_type_error: 'Position must be one of Substitution, YellowCard, RedCard, Goal'
  }),
  minute: z.number().int().positive(),
  otherPlayer: z.string({
    invalid_type_error: 'The other player must be a string'
  }).refine(startsWithUppercase, {
    message: 'The other player must start with an uppercase letter'
  }).nullable(),
  team: z.string({
    invalid_type_error: 'Team must be a string',
    required_error: 'Team is required'
  }).refine(startsWithUppercase, {
    message: 'Team must start with an uppercase letter'
  }),
  matchday: z.number().int().positive()
})

export function validateMatchEvent (input) {
  return matchEventSchema.safeParse(input)
}

export function validatePartialMatchEvent (input) {
  return matchEventSchema.safeParse(input)
}
