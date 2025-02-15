import mysql from 'mysql2/promise'
import { config } from '../../db/connect.js'

const connection = await mysql.createConnection(config)

export class PlayerModel {
  static async getAll ({ name, lastName, knownAs, number, height, country, position, team }) {
    let query = 'SELECT * FROM player WHERE 1=1'
    const params = []

    if (name && lastName && knownAs) {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(lastName) LIKE ? OR LOWER(knownAs) LIKE ?)'
      params.push(`%${name.toLowerCase()}%`, `%${lastName.toLowerCase()}%`, `%${knownAs.toLowerCase()}%`)
    } else {
      if (name) {
        query += ' AND LOWER(name) LIKE ?'
        params.push(`%${name.toLowerCase()}%`)
      }
      if (lastName) {
        query += ' AND LOWER(lastName) LIKE ?'
        params.push(`%${lastName.toLowerCase()}%`)
      }
      if (knownAs) {
        query += ' AND LOWER(knownAs) LIKE ?'
        params.push(`%${knownAs.toLowerCase()}%`)
      }
    }
    if (number) {
      query += ' AND number = ?'
      params.push(parseInt(number))
    }
    if (height) {
      query += ' AND height = ?'
      params.push(parseInt(height))
    }
    if (country) {
      query += ' AND LOWER(country) = ?'
      params.push(country.toLowerCase())
    }
    if (position) {
      query += ' AND position = ?'
      params.push(position)
    }
    if (team) {
      query += ' AND team_id = ?'
      params.push(parseInt(team))
    }

    const [players] = await connection.execute(query, params)
    return players
  }

  static async getById (id) {
    const [player] = await connection.execute('SELECT * FROM player WHERE id = ?', [id])
    return player
  }

  static async create ({ input }) {
    const {
      name,
      lastName,
      knownAs,
      number,
      height,
      country,
      position,
      birthday,
      photo,
      team
    } = input
    try {
      const [insertResult] = await connection.query(
        `INSERT INTO player(name, lastName, knownAs, number, height, country, position, birthday, photo, team_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, lastName, knownAs, number, height, country, position, birthday, photo, team]
      )
      const [newPlayer] = await connection.execute('SELECT * FROM player WHERE id = ?', [insertResult.insertId])
      return newPlayer
    } catch (error) {
      console.error('Error creating player', error)
      return null
    }
  }

  static async update ({ id, input }) {
    const player = await this.getById(id)
    if (!player) return null

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

    if (fields.length === 0) return player

    params.push(id)

    const query = `UPDATE player SET ${fields.join(', ')} WHERE id = ?`

    try {
      await connection.execute(query, params)
      const [updatedPlayer] = await connection.execute('SELECT * FROM player WHERE id = ?', [id])
      return updatedPlayer
    } catch (error) {
      console.error('Error updating player', error)
      return null
    }
  }

  static async delete (id) {
    const player = await this.getById(id)
    if (!player) return null

    try {
      await connection.execute('DELETE FROM player WHERE id = ?', [id])
      return player
    } catch (error) {
      console.error('Error deleting player', error)
      return null
    }
  }
}
