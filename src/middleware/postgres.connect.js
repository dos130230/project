import pg from 'pg'
import config from '../../config.js'
const pool = new pg.Pool(config.POOL)

export default (req, res, next) => {

  req.fetch = async function (query, ...params) {
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query, params.length ? params : null)
      return rows
    } catch (error) {
      return next(error)
    } finally {
      client.release()
    }
  }

  return next()
}
