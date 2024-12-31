import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'rootpass',
  database: 'lldb'
}

const connection = await mysql.createConnection(config)

export class TeamModel {
  static async getAll ({ name, year, city, mainColor }) {
    let query = 'SELECT * FROM team WHERE 1=1'
    const params = []

    if (name) {
      query += ' AND LOWER(name) LIKE ?'
      params.push(`%${name.toLowerCase()}%`)
    }
    if (year) {
      query += ' AND year = ?'
      params.push(parseInt(year))
    }
    if (city) {
      query += ' AND LOWER(city) = ?'
      params.push(city.toLowerCase())
    }
    if (mainColor) {
      query += ' AND mainColor = ?'
      params.push(mainColor)
    }

    const [teams] = await connection.execute(query, params)
    return teams
  }

  static async getById (id) {
    const [team] = await connection.execute('SELECT * FROM team WHERE id = ?', [id])
    return team
  }

  static async getPlayers (id) {
    const [team] = await this.getById(id)
    if (!team) return null

    const [players] = await connection.execute('SELECT * FROM player WHERE team_id = ?', [id])
    return players
  }

  static async create ({ input }) {
    const {
      name,
      year,
      website,
      president,
      badge,
      city,
      mainColor,
      secondaryColor
    } = input
    try {
      const [insertResult] = await connection.query(
        `INSERT INTO team(name,year,website,president,badge,city,mainColor,secondaryColor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, year, website, president, badge, city, mainColor, secondaryColor]
      )
      const [newTeam] = await connection.execute('SELECT * FROM team WHERE id = ?', [insertResult.insertId])
      return newTeam
    } catch (error) {
      console.error('Error creating team', error)
      return null
    }
  }

  static async update ({ id, input }) {
    const team = await this.getById(id)
    if (!team) return null

    const fields = []
    const params = []

    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`)
        params.push(value)
      }
    }

    if (fields.length === 0) return team

    params.push(id)

    const query = `UPDATE team SET ${fields.join(', ')} WHERE id = ?`

    try {
      await connection.execute(query, params)
      const [updatedTeam] = await connection.execute('SELECT * FROM team WHERE id = ?', [id])
      return updatedTeam
    } catch (error) {
      console.error('Error updating team', error)
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
