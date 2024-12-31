import { readJSON } from '../utils.js'
const managers = readJSON('./data/players.json')

export class ManagerModel {
  static async getAll ({ name, lastName, country, team }) {
    let filteredManagers = managers
    if (name) {
      filteredManagers = filteredManagers.filter(manager => manager.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (lastName) {
      filteredManagers = filteredManagers.filter(manager => manager.lastName.toLowerCase().includes(lastName.toLowerCase()))
    }
    if (country) {
      filteredManagers = filteredManagers.filter(manager => manager.country.toLowerCase() === country.toLowerCase())
    }
    if (team) {
      filteredManagers = filteredManagers.filter(manager => manager.team === parseInt(team))
    }
    return filteredManagers
  }

  static async getById (id) {
    return managers.find(team => team.id === parseInt(id))
  }

  static async create ({ input }) {
    const newManager = {
      id: managers.length + 1,
      ...input
    }
    managers.push(newManager)
    return newManager
  }

  static async update ({ id, input }) {
    const managerIndex = managers.findIndex(manager => manager.id === parseInt(id))
    if (managerIndex === -1) return false

    managers[managerIndex] = {
      ...managers[managerIndex],
      ...input
    }

    return managers[managerIndex]
  }
}
