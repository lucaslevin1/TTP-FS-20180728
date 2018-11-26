const router = require('express').Router()
const {Trade} = require('../db/models')

module.exports = router

router.get('/user', async (req, res, next) => {
  try {
    if (req.user) {
      const trades = await Trade.findAll()
      res.json(trades)
    }
  } catch (error) {
    next(error)
  }
})
