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
      const [nameAndBadge] = await connection.execute('SELECT shortName,badge FROM team WHERE id = ?', [team.team_id])
      return {
        ...team,
        shortName: nameAndBadge[0].shortName,
        badge: nameAndBadge[0].badge
      }
    }))
    return table
  }

  static async getLastMatchday (id) {
    const [league] = await this.getById(id)
    if (!league) return null

    const [lastMatchday] = await connection.execute('SELECT MAX(matchday_id) AS lastMatchday FROM `match` WHERE league_id = ?', [id])
    const [matches] = await connection.execute('SELECT matchdate, localTeam_id, awayTeam_id, matchday_id FROM `match` WHERE matchday_id = ? AND league_id = ?', [lastMatchday[0].lastMatchday, id])
    const results = []
    for (const match of matches) {
      const [localTeam] = await connection.execute('SELECT badge,shortName FROM team WHERE id = ?', [match.localTeam_id])
      const [localTeamStats] = await connection.execute('SELECT goals FROM teammatchstats WHERE matchday_id = ? AND team_id = ?', [match.matchday_id, match.localTeam_id])
      const [awayTeam] = await connection.execute('SELECT badge,shortName FROM team WHERE id = ?', [match.awayTeam_id])
      const [awayTeamStats] = await connection.execute('SELECT goals FROM teammatchstats WHERE matchday_id = ? AND team_id = ?', [match.matchday_id, match.awayTeam_id])
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

  static async getMatchday (id, matchday) {
    const [league] = await this.getById(id)
    if (!league) return null

    const [matches] = await connection.execute('SELECT matchdate, localTeam_id, awayTeam_id, matchday_id FROM `match` WHERE matchday_id = ? AND league_id = ?', [matchday, id])
    const results = []
    for (const match of matches) {
      const [localTeam] = await connection.execute('SELECT badge,shortName FROM team WHERE id = ?', [match.localTeam_id])
      const [localTeamStats] = await connection.execute('SELECT goals FROM teammatchstats WHERE matchday_id = ? AND team_id = ?', [match.matchday_id, match.localTeam_id])
      const [awayTeam] = await connection.execute('SELECT badge,shortName FROM team WHERE id = ?', [match.awayTeam_id])
      const [awayTeamStats] = await connection.execute('SELECT goals FROM teammatchstats WHERE matchday_id = ? AND team_id = ?', [match.matchday_id, match.awayTeam_id])
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
}
