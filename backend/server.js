require('dotenv').config()

const express = require('express');
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

// express app
const app = express()

app.use(express.json())

// middleware for each response and request, prints out the path and the method to the console
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

mongoose.connect('mongodb://localhost:27017/mernworkout', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening on port 4000')
})