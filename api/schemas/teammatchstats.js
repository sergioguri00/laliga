import { z } from 'zod'

const teamMatchStatsSchema = z.object({
  matchday: z.number().int().min(1),
  localTeam: z.number().int().min(0),
  localPossession: z.number().int().min(0),
  localShots: z.number().int().min(0).nullable(),
  localShotsOnTarget: z.number().int().min(0).nullable(),
  localCorners: z.number().int().min(0).nullable(),
  localOffsides: z.number().int().min(0).nullable(),
  localFouls: z.number().int().min(0).nullable(),
  localGoals: z.number().int().min(0),
  awayTeam: z.number().int().min(0),
  awayPossession: z.number().int().min(0),
  awayShots: z.number().int().min(0).nullable(),
  awayShotsOnTarget: z.number().int().min(0).nullable(),
  awayCorners: z.number().int().min(0).nullable(),
  awayOffsides: z.number().int().min(0).nullable(),
  awayFouls: z.number().int().min(0).nullable(),
  awayGoals: z.number().int().min(0)
})

export function validateTeamMatchStats (input) {
  return teamMatchStatsSchema.safeParse(input)
}

export function validatePartialTeamMatchStats (input) {
  return teamMatchStatsSchema.safeParse(input)
}
