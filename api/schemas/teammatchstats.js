import { z } from 'zod'

const teamMatchStatsSchema = z.object({
  team: z.string({
    invalid_type_error: 'Team must be a string',
    required_error: 'Team is required'
  }),
  matchday: z.number().int().min(1),
  possession: z.number().int().min(0),
  shots: z.number().int().min(0).nullable(),
  shotsOnTarget: z.number().int().min(0).nullable(),
  corners: z.number().int().min(0).nullable(),
  offsides: z.number().int().min(0).nullable(),
  fouls: z.number().int().min(0).nullable(),
  goals: z.number().int().min(0)
})

export function validateTeamMatchStats (input) {
  return teamMatchStatsSchema.safeParse(input)
}

export function validatePartialTeamMatchStats (input) {
  return teamMatchStatsSchema.safeParse(input)
}
