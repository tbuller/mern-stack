require('dotenv').config()

const express = require('express');
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware for each response and request, prints out the path and the method to the console
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening on port 4000')
})