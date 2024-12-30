import { PlayerModel } from '../models/player.js'

export class PlayerController {
  static async getAll (req, res) {
    const { name, lastName, number, height, country, position, team } = req.query
    const players = await PlayerModel.getAll({ name, lastName, number, height, country, position, team })
    res.json(players)
  }

  static async getById (req, res) {
    const { id } = req.params
    const player = await PlayerModel.getById(id)
    if (player) return res.json(player)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }
}
