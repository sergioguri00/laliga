import { StadiumModel } from '../models/stadium.js'
import { validatePartialStadium, validateStadium } from '../schemas/stadiums.js'

export class StadiumController {
  static async getAll (req, res) {
    const { name, year, team } = req.query
    const stadiums = await StadiumModel.getAll({ name, year, team })
    res.json(stadiums)
  }

  static async getById (req, res) {
    const { id } = req.params
    const stadium = await StadiumModel.getById(id)
    if (stadium) return res.json(stadium)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async getByTeam (req, res) {
    const { teamId } = req.params
    const stadium = await StadiumModel.getByTeam(teamId)
    if (stadium) return res.json(stadium)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async create (req, res) {
    const result = validateStadium(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newStadium = await StadiumModel.create({ input: result.data })

    res.status(201).json(newStadium)
  }

  static async update (req, res) {
    const result = validatePartialStadium(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedStadium = await StadiumModel.update({ id, input: result.data })

    return res.json(updatedStadium)
  }
}
