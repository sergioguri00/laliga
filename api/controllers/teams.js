import { TeamModel } from '../models/team.js'
import { validateTeam, validatePartialTeam } from '../schemas/teams.js'

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

  static async getStadium (req, res) {
    const { id } = req.params
    const stadium = await TeamModel.getStadium(id)
    if (stadium) return res.json(stadium)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async create (req, res) {
    const result = validateTeam(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newTeam = await TeamModel.create({ input: result.data })

    res.status(201).json(newTeam)
  }

  static async update (req, res) {
    const result = validatePartialTeam(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedTeam = await TeamModel.update({ id, input: result.data })

    return res.json(updatedTeam)
  }

  static async delete (req, res) {
    const { id } = req.params
    const team = await TeamModel.getById(id)

    if (team) {
      await TeamModel.delete(id)
      return res.status(204).send()
    }

    return res.status(404).send('<h1> 404 Error Not Found </h1>')
  }
}
