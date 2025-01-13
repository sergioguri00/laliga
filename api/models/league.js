import mysql from 'mysql2/promise'
import { config } from '../../db/connect.js'

const connection = await mysql.createConnection(config)

export class LeagueModel {
  static async getAll ({ country, season }) {
    let query = 'SELECT * FROM league WHERE 1=1'
    const params = []

    if (country) {
      query += ' AND LOWER(country) LIKE ?'
      params.push(`%${country.toLowerCase()}%`)
    }
    if (season) {
      query += ' AND year = ?'
      params.push(parseInt(season))
    }

    const [leagues] = await connection.execute(query, params)
    return leagues
  }

  static async getById (id) {
    const [league] = await connection.execute('SELECT * FROM league WHERE id = ?', [id])
    return league
  }

  static async getPlayers (id) {
    const [team] = await this.getById(id)
    if (!team) return null

    const [players] = await connection.execute('SELECT * FROM player WHERE team_id = ?', [id])
    return players
  }

  static async getTable (id) {
    const [league] = await this.getById(id)
    if (!league) return null

    const [result] = await connection.execute(`
        SELECT *, (goals_scored - goals_conceded) AS goalDifference 
        FROM teamstats 
        WHERE league_id = ? 
        ORDER BY points DESC, goalDifference DESC, goals_scored DESC
    `, [id])

    const table = await Promise.all(result.map(async team => {
      const [shortName] = await connection.execute('SELECT shortName FROM team WHERE id = ?', [team.team_id])
      return {
        ...team,
        shortName: shortName[0].shortName
      }
    }))
    return table
  }
}
