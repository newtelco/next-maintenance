const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  let page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 9
  if (page < 1) page = 1
  const maintenances = await db.query(escape`
      SELECT *
      FROM maintenancedb
      ORDER BY id
      LIMIT ${(page - 1) * limit}, ${limit}
    `)
  const count = await db.query(escape`
      SELECT COUNT(*)
      AS maintenanceCount
      FROM maintenancedb
    `)
  const { maintenancesCount } = count[0]
  const maintenanceCount = Math.ceil(maintenancesCount / limit)
  res.status(200).json({ maintenances, maintenanceCount, page })
}
