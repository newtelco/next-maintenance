const db = require('../../../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const maintId = req.query.maintId
  const value = req.query.timezone
  const label = decodeURIComponent(req.query.timezoneLabel)
  const updatedBy = req.query.updatedby
  const timezoneQuery = await db.query(escape`
    UPDATE maintenancedb SET timezone = ${value}, timezoneLabel = ${label}, updatedBy = ${updatedBy} WHERE id = ${maintId}
  `)
  if (timezoneQuery.affectedRows >= 1) {
    const updateHistory = await db.query(
      escape`INSERT INTO changelog (mid, user, action, field) VALUES (${maintId}, ${updatedBy}, 'changed', 'timezone');`
    )
    res.status(200).json({ statusText: 'OK', status: 200 })
  } else {
    res
      .status(200)
      .json({ statusText: 'FAIL', status: 500, err: 'Save Failed' })
  }
}
