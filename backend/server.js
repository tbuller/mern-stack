require('dotenv').config()

const express = require('express');

// express app
const app = express()

// routes
app.get('/', (req, res) => {
  res.json({msg: 'welcome to the webpage'})
})

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening on port 4000')
})