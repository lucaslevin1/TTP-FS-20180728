const User = require('./user')
const Trade = require('./trade')

Trade.belongsTo(User)
User.hasMany(Trade)

module.exports = {
  User,
  Trade
}
