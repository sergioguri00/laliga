import { z } from 'zod'

const teamMatchStatsSchema = z.object({
  team: z.string({
    invalid_type_error: 'Team must be a string',
    required_error: 'Team is required'
  }),
  matchdate: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message: 'Matchdate must be in the format YYYY-MM-DD HH:MM:SS',
    required_error: 'Matchdate is required'
  }),
  possession: z.number().int().min(0),
  shots: z.number().int().min(0),
  shotsOnTarget: z.number().int().min(0),
  corners: z.number().int().min(0),
  offsides: z.number().int().min(0),
  fouls: z.number().int().min(0)
})

export function validateTeamMatchStats (input) {
  return teamMatchStatsSchema.safeParse(input)
}

export function validatePartialTeamMatchStats (input) {
  return teamMatchStatsSchema.safeParse(input)
}
