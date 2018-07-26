const express = require('express')
const fetch = require('node-fetch')

module.exports = express.Router()
  .get('/someEndPoint', async (req, res) => {
    try {
      const result = await fetch('https://www.google.com').then(x => x.json())
      res.status(200).json({result})
    } catch (error) {
      res.status(400).json(error)
    }
  })
