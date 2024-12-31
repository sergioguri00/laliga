import { readJSON } from '../utils.js'
const stadiums = readJSON('./data/players.json')

export class StadiumModel {
  static async getAll ({ name, year, team }) {
    let filteredStadiums = stadiums
    if (name) {
      filteredStadiums = filteredStadiums.filter(stadium => stadium.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (year) {
      filteredStadiums = filteredStadiums.filter(stadium => stadium.year === parseInt(year))
    }
    if (team) {
      filteredStadiums = filteredStadiums.filter(stadium => stadium.team === parseInt(team))
    }
    return filteredStadiums
  }

  static async getById (id) {
    return stadiums.find(team => team.id === parseInt(id))
  }

  static async create ({ input }) {
    const newStadium = {
      id: stadiums.length + 1,
      ...input
    }
    stadiums.push(newStadium)
    return newStadium
  }

  static async update ({ id, input }) {
    const stadiumIndex = stadiums.findIndex(stadium => stadium.id === parseInt(id))
    if (stadiumIndex === -1) return false

    stadiums[stadiumIndex] = {
      ...stadiums[stadiumIndex],
      ...input
    }

    return stadiums[stadiumIndex]
  }
}
