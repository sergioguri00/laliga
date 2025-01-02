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
    let query = 'SELECT * FROM team WHERE 1=1'
    const params = []

    if (matchdate) {
      query += ' AND matchdate = ?'
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
      stadium,
      matchday
    } = input
    try {
      await connection.query(
        'INSERT INTO `match`(matchdate, localTeam_id, awayTeam_id, stadium_id, matchday_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [matchdate, localTeam, awayTeam, stadium, matchday]
      )
      const [newMatch] = await this.getMatch(matchdate, localTeam, awayTeam, stadium, matchday)
      return newMatch
    } catch (error) {
      console.error('Error creating match', error)
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
