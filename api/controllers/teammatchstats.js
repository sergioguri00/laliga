import { TeamMatchStatsModel } from '../models/teammatchstats.js'
import { validateTeamMatchStats } from '../schemas/teammatchstats.js'

export class TeamMatchStatsController {
  static async getAll (req, res) {
    const { team, matchdate, possession, shots, shotsOnTarget, corners, offsides, fouls } = req.query
    const teamsmatchstats = await TeamMatchStatsModel.getAll({ team, matchdate, possession, shots, shotsOnTarget, corners, offsides, fouls })
    res.json(teamsmatchstats)
  }

  static async create (req, res) {
    const result = validateTeamMatchStats(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newTeamMatchStats = await TeamMatchStatsModel.create({ input: result.data })

    res.status(201).json(newTeamMatchStats)
  }
}
