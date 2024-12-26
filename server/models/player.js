import { readJSON } from '../utils.js'
const players = readJSON('./data/players.json')

export class PlayerModel {
  static async getAll ({ name, lastName, number, height, country, position, team }) {
    let filteredPlayers = players
    if (name) {
      filteredPlayers = filteredPlayers.filter(player => player.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (lastName) {
      filteredPlayers = filteredPlayers.filter(player => player.lastName.toLowerCase().includes(lastName.toLowerCase()))
    }
    if (number) {
      filteredPlayers = filteredPlayers.filter(player => player.number === parseInt(number))
    }
    if (height) {
      filteredPlayers = filteredPlayers.filter(player => player.height === parseInt(height))
    }
    if (country) {
      filteredPlayers = filteredPlayers.filter(player => player.country.toLowerCase() === country.toLowerCase())
    }
    if (position) {
      filteredPlayers = filteredPlayers.filter(player => player.position.toLowerCase() === position.toLowerCase())
    }
    if (team) {
      filteredPlayers = filteredPlayers.filter(player => player.team === parseInt(team))
    }
    return filteredPlayers
  }

  static async getById (id) {
    return players.find(team => team.id === parseInt(id))
  }
}
