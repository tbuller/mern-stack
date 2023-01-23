const Workout = require('../models/Workouts')
const mongoose = require('mongoose')

const getWorkouts = async (req, res) => {
  const { workouts } = req.body

  try {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getWorkout = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'no such workout available, please try again'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'no such workout available, please try again'})
  }
  
  res.status(200).json(workout)
  
  
}

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = []

  if (!title) {
    emptyFields.push('title')
  } if (!load) {
    emptyFields.push('load')
  } if (!reps) {
    emptyFields.push('reps')
  } if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill out all of the fields to add your workout', emptyFields })
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'no such workout available, please try again'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(404).json({error: 'no such workout available, please try again'})
  }

  res.status(200).json(workout)
  
}

const updateWorkout = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'no such workout available, please try again'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(404).json({error: 'no such workout available, please try again'})
  }

  res.status(200).json(workout)
}


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}