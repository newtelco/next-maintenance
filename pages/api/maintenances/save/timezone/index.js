const db = require('../../../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const maintId = req.query.maintId
  const value = req.query.timezone
  const label = decodeURIComponent(req.query.timezoneLabel)
  const timezoneQuery = await db.query(escape`
    UPDATE maintenancedb SET timezone = ${value}, timezoneLabel = ${label} WHERE id = ${maintId}
  `)
  console.log(timezoneQuery)
  if (timezoneQuery.affectedRows >= 1) {
    res.status(200).json({ statusText: 'OK', status: 200 })
  } else {
    res.status(200).json({ statusText: 'FAIL', status: 500, err: 'Save Failed' })
  }
}
