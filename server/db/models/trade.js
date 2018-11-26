const Sequelize = require('sequelize')
const db = require('../db')

const Trade = db.define('trade', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Trade
