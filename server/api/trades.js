const router = require('express').Router()
const {Trade} = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const {symbol, quantity, price} = req.body
      const trade = await Trade.create({
        shares: quantity,
        symbol,
        price,
        userId: req.user.id
      })
      res.status(200).send(trade)
    } else {
      res.status(401).send('Need to be logged in to make a trade.')
    }
  } catch (error) {
    next(error)
  }
})
