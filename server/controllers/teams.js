import { TeamModel } from '../models/team.js'

export class TeamController {
  static async getAll (req, res) {
    const { name, year, city, mainColor } = req.query
    const filteredTeams = await TeamModel.getAll({ name, year, city, mainColor })
    res.json(filteredTeams)
  }

  static async getById (req, res) {
    const { id } = req.params
    const team = await TeamModel.getById(id)
    if (team) return res.json(team)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async getPlayers (req, res) {
    const { id } = req.params
    const players = await TeamModel.getPlayers(id)
    if (players) return res.json(players)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }
}
