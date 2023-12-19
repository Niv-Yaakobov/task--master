const express = require('express')

const {createTask} = require('../models/taskController')
const router = express.Router()

//Get all tasks
router.get(('/') , (req,res)=>{
    res.json({mssg:'GET all tasks'})
})

//Post new task
router.post(('/') , createTask)

//DELETE task
router.delete(('/:id') , (req,res)=>{
    res.json({mssg:'DELETE a new task'})
})

module.exports = router