const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const toSqlDatetime = (inputDate) => {
    const date = new Date(inputDate)
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return dateWithOffest
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
  }

  const maintId = req.body.id
  const values = req.body.values
  const user = req.body.user
  const field = req.body.field
  const save = await db.query(escape`
    UPDATE maintenancedb 
    SET
      cancelled = ${values.cancelled},
      done = ${values.done},
      emergency = ${values.emergency},
      startDateTime = ${toSqlDatetime(values.startDateTime)},
      endDateTime = ${toSqlDatetime(values.endDateTime)},
      impact = ${values.impact || ''},
      location = ${values.location || ''},
      reason = ${values.reason || ''},
      maintNote = ${values.maintNote || ''},
      lieferant = ${values.supplier || ''},
      derenCIDid = ${values.supplierCids ? values.supplierCids.join(',') : ''},
      timezone = ${values.timezone || ''}
    WHERE id LIKE ${maintId}
  `)
  const fieldName = {
    cancelled: 'cancelled',
    done: 'done',
    emergency: 'emergency',
    startDateTime: 'start date/time',
    endDateTime: 'end date/time',
    impact: 'impact',
    location: 'location',
    reason: 'reason',
    maintNote: 'notes',
    supplier: 'supplier',
    supplierCids: 'supplier cids',
    timezone: 'timezone'
  }
  let updateHistory
  if (field) {
    updateHistory = await db.query(escape`INSERT INTO changelog (mid, user, action, field) VALUES (${maintId}, ${user}, 'changed', ${fieldName[field]});`)
  }
  res.status(200).json({
    saved: save.affectedRows === 1 ? true : save,
    insertHistory: updateHistory?.affectedRows === 1,
    maintId,
    values
  })
}
