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

  static async getStats (id) {
    const [league] = await this.getById(id)
    if (!league) return null

    const [mostGoals] = await connection.execute('SELECT team_id, goals_scored AS mostGoals FROM teamstats WHERE league_id = ? AND goals_scored = (SELECT MAX(goals_scored) FROM teamstats WHERE league_id = ?) LIMIT 1;', [id, id])
    const [lessGoals] = await connection.execute('SELECT team_id, goals_scored AS lessGoals FROM teamstats WHERE league_id = ? AND goals_scored = (SELECT MIN(goals_scored) FROM teamstats WHERE league_id = ?) LIMIT 1;', [id, id])
    const [firstPosition] = await connection.execute('SELECT team_id, points, wins, draws, losses FROM teamstats WHERE league_id = ? AND points = (SELECT MAX(points) FROM teamstats WHERE league_id = ?) LIMIT 1;', [id, id])
    const [lastPosition] = await connection.execute('SELECT team_id, points, wins, draws, losses FROM teamstats WHERE league_id = ? AND points = (SELECT MIN(points) FROM teamstats WHERE league_id = ?) LIMIT 1;', [id, id])
    const [mostDraws] = await connection.execute('SELECT team_id, draws FROM teamstats WHERE league_id = ? AND draws = (SELECT MAX(draws) FROM teamstats WHERE league_id = ?) LIMIT 1;', [id, id])

    const [mostGoalsTeam] = await connection.execute('SELECT t.shortName, t.city, m.name, m.fullName FROM team t JOIN manager m ON t.id = m.team_id WHERE t.id = ?', [mostGoals[0].team_id])
    const [lessGoalsTeam] = await connection.execute('SELECT t.shortName, t.city, m.name, m.fullName FROM team t JOIN manager m ON t.id = m.team_id WHERE t.id = ?', [lessGoals[0].team_id])
    const [firstPositionTeam] = await connection.execute('SELECT t.shortName, t.city, m.name, m.fullName FROM team t JOIN manager m ON t.id = m.team_id WHERE t.id = ?', [firstPosition[0].team_id])
    const [lastPositionTeam] = await connection.execute('SELECT t.shortName, t.city, m.name, m.fullName FROM team t JOIN manager m ON t.id = m.team_id WHERE t.id = ?', [lastPosition[0].team_id])
    const [mostDrawsTeam] = await connection.execute('SELECT t.shortName, t.city, m.name, m.fullName FROM team t JOIN manager m ON t.id = m.team_id WHERE t.id = ?', [mostDraws[0].team_id])

    const data = {
      mostGoals: {
        team_id: mostGoals[0].team_id,
        team: mostGoalsTeam[0].shortName,
        city: mostGoalsTeam[0].city,
        managerName: mostGoalsTeam[0].name,
        managerLastName: mostGoalsTeam[0].lastName,
        goals: mostGoals[0].mostGoals
      },
      lessGoals: {
        team_id: lessGoals[0].team_id,
        team: lessGoalsTeam[0].shortName,
        city: lessGoalsTeam[0].city,
        managerName: lessGoalsTeam[0].name,
        managerLastName: lessGoalsTeam[0].lastName,
        goals: lessGoals[0].lessGoals
      },
      firstPosition: {
        team_id: firstPosition[0].team_id,
        team: firstPositionTeam[0].shortName,
        city: firstPositionTeam[0].city,
        managerName: firstPositionTeam[0].name,
        managerLastName: firstPositionTeam[0].lastName,
        points: firstPosition[0].points,
        wins: firstPosition[0].wins,
        draws: firstPosition[0].draws,
        losses: firstPosition[0].losses
      },
      lastPosition: {
        team_id: lastPosition[0].team_id,
        team: lastPositionTeam[0].shortName,
        city: lastPositionTeam[0].city,
        managerName: lastPositionTeam[0].name,
        managerLastName: lastPositionTeam[0].lastName,
        points: lastPosition[0].points,
        wins: lastPosition[0].wins,
        draws: lastPosition[0].draws,
        losses: lastPosition[0].losses
      },
      mostDraws: {
        team_id: mostDraws[0].team_id,
        team: mostDrawsTeam[0].shortName,
        city: mostDrawsTeam[0].city,
        managerName: mostDrawsTeam[0].name,
        managerLastName: mostDrawsTeam[0].lastName,
        draws: mostDraws[0].draws
      }
    }
    return data
  }
}
