import mysql from 'mysql2/promise'
import { config } from '../../db/connect.js'

const connection = await mysql.createConnection(config)

export class TeamMatchStatsModel {
  static async getAll ({ team, matchday, possession, shots, shotsOnTarget, corners, offsides, fouls }) {
    let query = 'SELECT * FROM teammatchstats WHERE 1=1'
    const params = []

    if (team) {
      query += ' AND team_id = ?'
      params.push(parseInt(team))
    }
    if (matchday) {
      query += ' AND matchday_id = ?'
      params.push(matchday)
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

    query += ' ORDER BY matchday_id DESC'

    const [teamsMatchStats] = await connection.execute(query, params)
    return teamsMatchStats
  }

  static async create ({ input }) {
    const {
      matchday,
      localTeam,
      localPossession,
      localShots,
      localShotsOnTarget,
      localCorners,
      localOffsides,
      localFouls,
      localGoals,
      awayTeam,
      awayPossession,
      awayShots,
      awayShotsOnTarget,
      awayCorners,
      awayOffsides,
      awayFouls,
      awayGoals
    } = input
    try {
      const [checkIfMatchExists] = await connection.execute('SELECT * FROM `match` WHERE (localTeam_id = ? AND awayTeam_id = ?) AND matchday_id = ?', [localTeam, awayTeam, matchday])
      if (checkIfMatchExists.length === 1) {
        await connection.query(
          `INSERT INTO teammatchstats(team_id, matchday_id, possession, shots, shots_on_target, corners, offsides, fouls, goals)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [localTeam, matchday, localPossession, localShots, localShotsOnTarget, localCorners, localOffsides, localFouls, localGoals]
        )
        await connection.query(
          `INSERT INTO teammatchstats(team_id, matchday_id, possession, shots, shots_on_target, corners, offsides, fouls, goals)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [awayTeam, matchday, awayPossession, awayShots, awayShotsOnTarget, awayCorners, awayOffsides, awayFouls, awayGoals]
        )
        if (localGoals > awayGoals) {
          await connection.query('UPDATE teamstats SET points = points + 3, matches_played = matches_played + 1, wins = wins + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [localGoals, awayGoals, localTeam])
          await connection.query('UPDATE teamstats SET matches_played = matches_played + 1, losses = losses + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [awayGoals, localGoals, awayTeam])
        } else if (localGoals < awayGoals) {
          await connection.query('UPDATE teamstats SET points = points + 3, matches_played = matches_played + 1, wins = wins + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [awayGoals, localGoals, awayTeam])
          await connection.query('UPDATE teamstats SET matches_played = matches_played + 1, losses = losses + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [localGoals, awayGoals, localGoals])
        } else if (localGoals === awayGoals) {
          await connection.query('UPDATE teamstats SET points = points + 1, matches_played = matches_played + 1, draws = draws + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [localGoals, awayGoals, localTeam])
          await connection.query('UPDATE teamstats SET points = points + 1, matches_played = matches_played + 1, draws = draws + 1, goals_scored = goals_scored + ?, goals_conceded = goals_conceded + ?  WHERE team_id = ?', [awayGoals, localGoals, awayTeam])
        }
        const [newLocalTeamMatchStats] = await connection.execute('SELECT * FROM teammatchstats WHERE team_id = ? AND matchday_id = ?', [localTeam, matchday])
        const [newAwayTeamMatchStats] = await connection.execute('SELECT * FROM teammatchstats WHERE team_id = ? AND matchday_id = ?', [awayTeam, matchday])
        return { localTeamMatchStats: newLocalTeamMatchStats[0], awayTeamMatchStats: newAwayTeamMatchStats[0] }
      } else {
        return { error: 'Match does not exist' }
      }
    } catch (error) {
      return { error: `Error creating team match stats = ${error}` }
    }
  }
}
