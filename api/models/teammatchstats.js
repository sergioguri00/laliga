import mysql from 'mysql2/promise'
import { config } from '../../db/connect.js'

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

    query += ' ORDER BY matchdate DESC'

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
      fouls,
      goals
    } = input
    try {
      const [teamId] = await connection.execute(`SELECT id FROM team WHERE LOWER(name) LIKE '%${team.toLowerCase()}%' LIMIT 1;`)
      const [checkIfMatchExists] = await connection.execute('SELECT * FROM `match` WHERE (localTeam_id = ? OR awayTeam_id = ?) AND matchdate = ?', [teamId[0].id, teamId[0].id, matchdate])
      if (checkIfMatchExists.length === 1) {
        await connection.query(
          `INSERT INTO teammatchstats(team_id, matchdate, possession, shots, shots_on_target, corners, offsides, fouls, goals)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [teamId[0].id, matchdate, possession, shots, shotsOnTarget, corners, offsides, fouls, goals]
        )
        const [checkIfMatchIsCompleted] = await connection.execute('SELECT * FROM teammatchstats WHERE matchdate = ? AND (team_id = ? OR team_id = ?)', [matchdate, checkIfMatchExists[0].localTeam_id, checkIfMatchExists[0].awayTeam_id])
        if (checkIfMatchIsCompleted.length === 2) {
          if (checkIfMatchIsCompleted[0].goals > checkIfMatchIsCompleted[1].goals) {
            await connection.query('UPDATE teamstats SET points = points + 3, matches_played = matches_played + 1, wins = wins + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [checkIfMatchIsCompleted[0].goals, checkIfMatchIsCompleted[1].goals, checkIfMatchIsCompleted[0].team_id])
            await connection.query('UPDATE teamstats SET matches_played = matches_played + 1, losses = losses + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [checkIfMatchIsCompleted[1].goals, checkIfMatchIsCompleted[0].goals, checkIfMatchIsCompleted[1].team_id])
          } else if (checkIfMatchIsCompleted[0].goals < checkIfMatchIsCompleted[1].goals) {
            await connection.query('UPDATE teamstats SET points = points + 3, matches_played = matches_played + 1, wins = wins + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [checkIfMatchIsCompleted[1].goals, checkIfMatchIsCompleted[0].goals, checkIfMatchIsCompleted[1].team_id])
            await connection.query('UPDATE teamstats SET matches_played = matches_played + 1, losses = losses + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [checkIfMatchIsCompleted[0].goals, checkIfMatchIsCompleted[1].goals, checkIfMatchIsCompleted[0].team_id])
          } else if (checkIfMatchIsCompleted[0].goals === checkIfMatchIsCompleted[1].goals) {
            await connection.query('UPDATE teamstats SET points = points + 1, matches_played = matches_played + 1, draws = draws + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [checkIfMatchIsCompleted[0].goals, checkIfMatchIsCompleted[1].goals, checkIfMatchIsCompleted[0].team_id])
            await connection.query('UPDATE teamstats SET points = points + 1, matches_played = matches_played + 1, draws = draws + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [checkIfMatchIsCompleted[1].goals, checkIfMatchIsCompleted[0].goals, checkIfMatchIsCompleted[1].team_id])
          }
        }
        const [newTeamMatchStats] = await connection.execute('SELECT * FROM teammatchstats WHERE team_id = ? AND matchdate = ?', [teamId[0].id, matchdate])
        return newTeamMatchStats
      } else {
        return { error: 'Match does not exist' }
      }
    } catch (error) {
      return { error: `Error creating team match stats = ${error}` }
    }
  }
}
