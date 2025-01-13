import mysql from 'mysql2/promise'
import { config } from '../../db/connect.js'

const connection = await mysql.createConnection(config)

export class ManagerModel {
  static async getAll ({ name, lastName, country, team }) {
    let query = 'SELECT * FROM manager WHERE 1=1'
    const params = []

    if (name) {
      query += ' AND name LIKE ?'
      params.push(`%${name}%`)
    }

    if (lastName) {
      query += ' AND lastName LIKE ?'
      params.push(`%${lastName}%`)
    }

    if (country) {
      query += ' AND country LIKE ?'
      params.push(`%${country}%`)
    }

    if (team) {
      query += ' AND team_id = ?'
      params.push(team)
    }
    const [managers] = await connection.execute(query, params)

    return managers
  }

  static async getById (id) {
    const [manager] = await connection.execute('SELECT * FROM manager WHERE id = ?', [id])
    return manager
  }

  static async create ({ input }) {
    const {
      name,
      lastName,
      country,
      birthday,
      photo,
      teamId
    } = input
    try {
      const [insertResult] = await connection.query(
        'INSERT INTO manager(name,lastName,country,birthday,photo,team_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, lastName, country, birthday, photo, teamId]
      )
      const [newManager] = await connection.execute('SELECT * FROM manager WHERE id = ?', [insertResult.insertId])
      return newManager
    } catch (error) {
      console.error('Error creating manager', error)
      return null
    }
  }

  static async update ({ id, input }) {
    const manager = await this.getById(id)
    if (!manager) return null

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

    if (fields.length === 0) return manager

    params.push(id)

    const query = `UPDATE manager SET ${fields.join(', ')} WHERE id = ?`

    try {
      await connection.execute(query, params)
      const [updatedManager] = await connection.execute('SELECT * FROM manager WHERE id = ?', [id])
      return updatedManager
    } catch (error) {
      console.error('Error updating manager', error)
      return null
    }
  }

  static async delete (id) {
    const manager = await this.getById(id)
    if (!manager) return null

    try {
      await connection.execute('DELETE FROM manager WHERE id = ?', [id])
      return manager
    } catch (error) {
      console.error('Error deleting manager', error)
      return null
    }
  }
}
