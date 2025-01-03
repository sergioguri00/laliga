import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'rootpass',
  database: 'lldb'
}

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

    const [matches] = await connection.execute(query, params)
    return matches
  }

  static async getMatch (matchdate, localTeam, awayTeam, stadium, matchday) {
    const [match] = await connection.execute('SELECT * FROM `match` WHERE matchdate = ? AND localTeam_id = ? AND awayTeam_id = ? AND stadium_id = ? AND matchday_id = ?',
      [matchdate, localTeam, awayTeam, stadium, matchday])
    return match
  }

  static async create ({ input }) {
    const {
      matchdate,
      localTeam,
      awayTeam,
      matchday
    } = input
    const [local] = await connection.execute(`SELECT * FROM team WHERE name LIKE '%${localTeam}%' LIMIT 1;`)
    const [away] = await connection.execute(`SELECT * FROM team WHERE name LIKE '%${awayTeam}%' LIMIT 1;`)
    try {
      await connection.query(
        'INSERT INTO `match`(matchdate, localTeam_id, awayTeam_id, stadium_id, matchday_id) VALUES (?, ?, ?, ?, ?)',
        [matchdate, local[0].id, away[0].id, local[0].id, matchday]
      )
      const [newMatch] = await this.getMatch(matchdate, local[0].id, away[0].id, local[0].id, matchday)
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
