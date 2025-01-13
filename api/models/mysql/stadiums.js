import mysql from 'mysql2/promise'
import config from '../../config/mysql.js'

const connection = await mysql.createConnection(config)

export class StadiumModel {
  static async getAll ({ name, year, team }) {
    let query = 'SELECT * FROM `match` WHERE 1=1'
    const params = []

    if (name) {
      query += ' AND name LIKE ?'
      params.push(`%${name}%`)
    }

    if (year) {
      query += ' AND year = ?'
      params.push(year)
    }

    if (team) {
      query += ' AND team_id = ?'
      params.push(team)
    }
    const [stadiums] = await connection.execute(query, params)

    return stadiums
  }

  static async getById (id) {
    const [stadium] = await connection.execute('SELECT * FROM stadium WHERE id = ?', [id])
    return stadium
  }

  static async getByTeam (teamId) {
    const [stadium] = await connection.execute('SELECT * FROM stadium WHERE team_id = ?', [teamId])
    return stadium
  }

  static async create ({ input }) {
    const {
      name,
      year,
      latitude,
      longitude,
      capacity,
      photo,
      teamId
    } = input
    try {
      const [insertResult] = await connection.query(
        'INSERT INTO stadium(name,year,latitude,longitude,capacity,photo,team_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, year, latitude, longitude, capacity, photo, teamId]
      )
      const [newStadium] = await connection.execute('SELECT * FROM stadium WHERE id = ?', [insertResult.insertId])
      return newStadium
    } catch (error) {
      console.error('Error creating stadium', error)
      return null
    }
  }

  static async update ({ id, input }) {
    const stadium = await this.getById(id)
    if (!stadium) return null

    const fields = []
    const params = []

    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        if (key.includes('team')) {
          fields.push('team_id = ?')
          params.push(value)
        } else {
          fields.push(`${key} = ?`)
          params.push(value)
        }
      }
    }

    if (fields.length === 0) return stadium

    params.push(id)

    const query = `UPDATE stadium SET ${fields.join(', ')} WHERE id = ?`

    try {
      await connection.execute(query, params)
      const [updatedStadium] = await connection.execute('SELECT * FROM stadium WHERE id = ?', [id])
      return updatedStadium
    } catch (error) {
      console.error('Error updating stadium', error)
      return null
    }
  }

  static async delete (id) {
    const stadium = await this.getById(id)
    if (!stadium) return null

    try {
      await connection.execute('DELETE FROM stadium WHERE id = ?', [id])
      return stadium
    } catch (error) {
      console.error('Error deleting stadium', error)
      return null
    }
  }
}
