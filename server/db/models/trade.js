const Sequelize = require('sequelize')
const db = require('../db')

const Trade = db.define('trade', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.01
    }
  }
})

module.exports = Trade
