import mysql from 'mysql2/promise'
import { config } from '../../db/connect.js'

const connection = await mysql.createConnection(config)

export class TeamModel {
  static async getAll ({ name, shortName, year, city, mainColor }) {
    let query = 'SELECT * FROM team WHERE 1=1'
    const params = []

    if (name) {
      query += ' AND LOWER(name) LIKE ?'
      params.push(`%${name.toLowerCase()}%`)
    }
    if (shortName) {
      query += ' AND LOWER(shortName) LIKE ?'
      params.push(`%${shortName.toLowerCase()}%`)
    }
    if (year) {
      query += ' AND year = ?'
      params.push(parseInt(year))
    }
    if (city) {
      query += ' AND LOWER(city) = ?'
      params.push(city.toLowerCase())
    }
    if (mainColor) {
      query += ' AND mainColor = ?'
      params.push(mainColor)
    }

    const [teams] = await connection.execute(query, params)
    return teams
  }

  static async getById (id) {
    const [team] = await connection.execute('SELECT * FROM team WHERE id = ?', [id])
    return team
  }

  static async getPlayers (id) {
    const [team] = await this.getById(id)
    if (!team) return null

    const [players] = await connection.execute('SELECT * FROM player WHERE team_id = ?', [id])
    return players
  }

  static async getStadium (id) {
    const [team] = await this.getById(id)
    if (!team) return null

    const [stadium] = await connection.execute('SELECT * FROM stadium WHERE team_id = ?', [id])
    return stadium
  }

  static async getManager (id) {
    const [team] = await this.getById(id)
    if (!team) return null

    const [manager] = await connection.execute('SELECT * FROM manager WHERE team_id = ?', [id])
    return manager
  }

  static async getMatches (id) {
    const [team] = await this.getById(id)
    if (!team) return null

    const [matches] = await connection.execute('SELECT matchdate, localTeam_id, awayTeam_id, matchday_id FROM `match` WHERE localTeam_id = ? OR awayTeam_id = ? ORDER BY matchday_id', [id, id])
    const results = []
    for (const match of matches) {
      const [localTeam] = await connection.execute('SELECT badge,shortName FROM team WHERE id = ?', [match.localTeam_id])
      const [localTeamStats] = await connection.execute('SELECT goals FROM teammatchstats WHERE matchdate = ? AND team_id = ?', [match.matchdate, match.localTeam_id])
      const [awayTeam] = await connection.execute('SELECT badge,shortName FROM team WHERE id = ?', [match.awayTeam_id])
      const [awayTeamStats] = await connection.execute('SELECT goals FROM teammatchstats WHERE matchdate = ? AND team_id = ?', [match.matchdate, match.awayTeam_id])
      results.push({
        matchdate: match.matchdate,
        localTeamId: match.localTeam_id,
        localTeamBadge: localTeam[0].badge,
        localTeamName: localTeam[0].shortName,
        localTeamGoals: (localTeamStats.length > 0 && localTeamStats[0].goals !== undefined) ? localTeamStats[0].goals : 0,
        awayTeamId: match.awayTeam_id,
        awayTeamBadge: awayTeam[0].badge,
        awayTeamName: awayTeam[0].shortName,
        awayTeamGoals: (awayTeamStats.length > 0 && awayTeamStats[0].goals !== undefined) ? awayTeamStats[0].goals : 0,
        matchday_id: match.matchday_id
      })
    }
    return results
  }

  static async create ({ input }) {
    const {
      name,
      year,
      website,
      president,
      badge,
      city,
      mainColor,
      secondaryColor
    } = input
    try {
      const [insertResult] = await connection.query(
        `INSERT INTO team(name,year,website,president,badge,city,mainColor,secondaryColor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, year, website, president, badge, city, mainColor, secondaryColor]
      )
      const [newTeam] = await connection.execute('SELECT * FROM team WHERE id = ?', [insertResult.insertId])
      return newTeam
    } catch (error) {
      console.error('Error creating team', error)
      return null
    }
  }

  static async update ({ id, input }) {
    const team = await this.getById(id)
    if (!team) return null

    const fields = []
    const params = []

    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`)
        params.push(value)
      }
    }

    if (fields.length === 0) return team

    params.push(id)

    const query = `UPDATE team SET ${fields.join(', ')} WHERE id = ?`

    try {
      await connection.execute(query, params)
      const [updatedTeam] = await connection.execute('SELECT * FROM team WHERE id = ?', [id])
      return updatedTeam
    } catch (error) {
      console.error('Error updating team', error)
      return null
    }
  }

  static async delete (id) {
    const team = await this.getById(id)
    if (!team) return null

    try {
      await connection.execute('DELETE FROM team WHERE id = ?', [id])
      return team
    } catch (error) {
      console.error('Error deleting team', error)
      return null
    }
  }
}
