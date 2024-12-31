import { readJSON } from '../utils.js'
const teams = readJSON('./data/teams.json')
const players = readJSON('./data/players.json')

export class TeamModel {
  static async getAll ({ name, year, city, mainColor }) {
    let filteredTeams = teams
    if (name) {
      filteredTeams = filteredTeams.filter(team => team.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (year) {
      filteredTeams = filteredTeams.filter(team => team.year === parseInt(year))
    }
    if (city) {
      filteredTeams = filteredTeams.filter(team => team.city.toLowerCase() === city.toLowerCase())
    }
    if (mainColor) {
      filteredTeams = filteredTeams.filter(team => team.mainColor === mainColor)
    }
    return filteredTeams
  }

  static async getById (id) {
    return teams.find(team => team.id === parseInt(id))
  }

  static async getPlayers (id) {
    const team = await this.getById(id)
    if (!team) return null
    return players.filter(player => player.team === parseInt(id))
  }

  static async create ({ input }) {
    const newTeam = {
      id: teams.length + 1,
      ...input
    }
    teams.push(newTeam)
    return newTeam
  }

  static async update ({ id, input }) {
    const teamIndex = teams.findIndex(stadium => stadium.id === parseInt(id))
    if (teamIndex === -1) return false

    teams[teamIndex] = {
      ...teams[teamIndex],
      ...input
    }

    return teams[teamIndex]
  }
}
