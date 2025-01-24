import mysql from 'mysql2/promise'
import { config } from '../../db/connect.js'

const connection = await mysql.createConnection(config)

export class MatchModel {
  static async getAll ({ matchdate, localTeam, awayTeam, stadium, matchday }) {
    let query = 'SELECT * FROM `match` WHERE 1=1'
    const params = []

    if (matchdate) {
      query += ' AND DATE(matchdate) = ?'
      params.push(matchdate)
    }
    if (localTeam) {
      query += ' AND localTeam_id = ?'
      params.push(parseInt(localTeam))
    }
    if (awayTeam) {
      query += ' AND awayTeam_id = ?'
      params.push(parseInt(awayTeam))
    }
    if (stadium) {
      query += ' AND stadium_id = ?'
      params.push(parseInt(stadium))
    }
    if (matchday) {
      query += ' AND matchday_id = ?'
      params.push(parseInt(matchday))
    }

    query += ' ORDER BY matchdate ASC'
    const [result] = await connection.execute(query, params)

    const matches = await Promise.all(result.map(async match => {
      const [localTeam] = await connection.execute('SELECT shortName FROM team WHERE id = ?', [match.localTeam_id])
      const [awayTeam] = await connection.execute('SELECT shortName FROM team WHERE id = ?', [match.awayTeam_id])
      const [stadium] = await connection.execute('SELECT name FROM stadium WHERE id = ?', [match.stadium_id])
      return {
        ...match,
        localTeam: localTeam[0].shortName,
        awayTeam: awayTeam[0].shortName,
        stadium: stadium[0].name
      }
    }))

    return matches
  }

  static async getMatch (matchdate, localTeam, awayTeam, stadium, matchday) {
    const [result] = await connection.execute('SELECT * FROM `match` WHERE matchdate = ? AND localTeam_id = ? AND awayTeam_id = ? AND stadium_id = ? AND matchday_id = ?',
      [matchdate, localTeam, awayTeam, stadium, matchday])
    const match = await Promise.all(result.map(async match => {
      const [localTeam] = await connection.execute('SELECT shortName FROM team WHERE id = ?', [match.localTeam_id])
      const [awayTeam] = await connection.execute('SELECT shortName FROM team WHERE id = ?', [match.awayTeam_id])
      const [stadium] = await connection.execute('SELECT name FROM stadium WHERE id = ?', [match.stadium_id])
      return {
        ...match,
        localTeam: localTeam[0].shortName,
        awayTeam: awayTeam[0].shortName,
        stadium: stadium[0].name
      }
    }))
    return match
  }

  static async create ({ input }) {
    const {
      matchdate,
      localTeam,
      awayTeam,
      matchday,
      leagueId
    } = input
    const [local] = await connection.execute(`SELECT * FROM team WHERE LOWER(name) LIKE '%${localTeam.toLowerCase()}%' LIMIT 1;`)
    const [away] = await connection.execute(`SELECT * FROM team WHERE LOWER(name) LIKE '%${awayTeam.toLowerCase()}%' LIMIT 1;`)
    try {
      await connection.query(
        'INSERT INTO `match`(matchdate, localTeam_id, awayTeam_id, stadium_id, matchday_id, league_id) VALUES (?, ?, ?, ?, ?, ?)',
        [matchdate, local[0].id, away[0].id, local[0].id, matchday, leagueId]
      )
      const [newMatch] = await this.getMatch(matchdate, local[0].id, away[0].id, local[0].id, matchday, leagueId)
      return newMatch
    } catch (error) {
      console.error('Error creating match', error)
      return null
    }
  }

  static async delete (matchdate, localTeam, awayTeam, stadium, matchday) {
    const match = await this.getMatch(matchdate, localTeam, awayTeam, stadium, matchday)
    if (!match) return null

    try {
      await connection.execute('DELETE FROM `match` WHERE matchdate = ? AND localTeam_id = ? AND awayTeam_id = ? AND stadium_id = ? AND matchday_id = ?',
        [matchdate, localTeam, awayTeam, stadium, matchday])
      return match
    } catch (error) {
      console.error('Error deleting match', error)
      return null
    }
  }
}
