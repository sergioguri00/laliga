import { ManagerModel } from '../models/manager.js'
import { validatePartialManager, validateManager } from '../schemas/managers.js'

export class ManagerController {
  static async getAll (req, res) {
    const { name, fullName, country, team } = req.query
    const managers = await ManagerModel.getAll({ name, fullName, country, team })
    res.json(managers)
  }

  static async getById (req, res) {
    const { id } = req.params
    const manager = await ManagerModel.getById(id)
    if (manager) return res.json(manager)
    res.status(404).send('<h1> 404 Error Not Found </h1>')
  }

  static async create (req, res) {
    const result = validateManager(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newManager = await ManagerModel.create({ input: result.data })

    res.status(201).json(newManager)
  }

  static async update (req, res) {
    const result = validatePartialManager(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedManager = await ManagerModel.update({ id, input: result.data })

    return res.json(updatedManager)
  }
}
