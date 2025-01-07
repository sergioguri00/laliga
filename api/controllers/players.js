import { PlayerModel } from '../models/mysql/player.js'
import { validatePartialPlayer, validatePlayer } from '../schemas/players.js'

export class PlayerController {
  static async getAll (req, res) {
    const { name, lastName, knownAs, number, height, country, position, team } = req.query
    const players = await PlayerModel.getAll({ name, lastName, knownAs, number, height, country, position, team })
    res.json(players)
  }

  static async getById (req, res) {
    const { id } = req.params
    const player = await PlayerModel.getById(id)
    if (player) return res.json(player)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async create (req, res) {
    const result = validatePlayer(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newPlayer = await PlayerModel.create({ input: result.data })

    res.status(201).json(newPlayer)
  }

  static async update (req, res) {
    const result = validatePartialPlayer(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedPlayer = await PlayerModel.update({ id, input: result.data })

    return res.json(updatedPlayer)
  }
}
