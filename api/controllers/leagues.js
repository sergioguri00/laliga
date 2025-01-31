import { LeagueModel } from '../models/league.js'

export class LeagueController {
  static async getAll (req, res) {
    const { country, season } = req.query
    const leagues = await LeagueModel.getAll({ country, season })
    res.json(leagues)
  }

  static async getById (req, res) {
    const { id } = req.params
    const league = await LeagueModel.getById(id)
    if (league) return res.json(league)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async getTable (req, res) {
    const { id } = req.params
    const table = await LeagueModel.getTable(id)
    if (table) return res.json(table)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async getLastMatchday (req, res) {
    const { id } = req.params
    const lastMatchday = await LeagueModel.getLastMatchday(id)
    res.json(lastMatchday)
  }

  static async getMatchday (req, res) {
    const { id, matchday } = req.params
    const matchdayArray = await LeagueModel.getMatchday(id, matchday)
    res.json(matchdayArray)
  }

  static async getStats (req, res) {
    const { id } = req.params
    const stats = await LeagueModel.getStats(id)
    res.json(stats)
  }
}
