import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'rootpass',
  database: 'lldb'
}

const connection = await mysql.createConnection(config)

export class TeamMatchStatsModel {
  static async getAll ({ team, matchdate, possession, shots, shotsOnTarget, corners, offsides, fouls }) {
    let query = 'SELECT * FROM teammatchstats WHERE 1=1'
    const params = []

    if (team) {
      query += ' AND team_id = ?'
      params.push(parseInt(team))
    }
    if (matchdate) {
      query += ' AND matchdate = ?'
      params.push(matchdate)
    }
    if (possession) {
      query += ' AND possession = ?'
      params.push(parseInt(possession))
    }
    if (shots) {
      query += ' AND shots = ?'
      params.push(parseInt(shots))
    }
    if (shotsOnTarget) {
      query += ' AND shotsOnTarget = ?'
      params.push(parseInt(shotsOnTarget))
    }
    if (corners) {
      query += ' AND corners = ?'
      params.push(parseInt(corners))
    }
    if (offsides) {
      query += ' AND offsides = ?'
      params.push(parseInt(offsides))
    }
    if (fouls) {
      query += ' AND fouls = ?'
      params.push(parseInt(fouls))
    }

    const [teamsMatchStats] = await connection.execute(query, params)
    return teamsMatchStats
  }

  static async create ({ input }) {
    const {
      team,
      matchdate,
      possession,
      shots,
      shotsOnTarget,
      corners,
      offsides,
      fouls
    } = input
    try {
      const [teamId] = await connection.execute(`SELECT id FROM team WHERE LOWER(name) LIKE '%${team.toLowerCase()}%' LIMIT 1;`)
      await connection.query(
        `INSERT INTO teammatchstats(team_id, matchdate, possession, shots, shots_on_target, corners, offsides, fouls)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [teamId[0].id, matchdate, possession, shots, shotsOnTarget, corners, offsides, fouls]
      )
      const [newTeamMatchStats] = await connection.execute('SELECT * FROM teammatchstats WHERE team_id = ? AND matchdate = ?', [teamId[0].id, matchdate])
      return newTeamMatchStats
    } catch (error) {
      console.error('Error creating player', error)
      return null
    }
  }
}
