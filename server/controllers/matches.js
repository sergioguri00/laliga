import { MatchModel } from '../models/mysql/match.js'
import { validateMatch } from '../schemas/matches.js'

export class MatchController {
  static async getAll (req, res) {
    const { matchdate, localTeam, awayTeam, stadium, matchday } = req.query
    const matches = await MatchModel.getAll({ matchdate, localTeam, awayTeam, stadium, matchday })
    res.json(matches)
  }

  static async getMatch (req, res) {
    const { matchdate, localTeam, awayTeam, stadium, matchday } = req.params
    const match = await MatchModel.getMatch(matchdate, localTeam, awayTeam, stadium, matchday)
    if (match) return res.json(match)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async create (req, res) {
    const result = validateMatch(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMatch = await MatchModel.create({ input: result.data })

    res.status(201).json(newMatch)
  }
}
