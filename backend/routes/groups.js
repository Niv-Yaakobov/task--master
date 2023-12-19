const express = require('express')

const Group = require('../models/groupModel')

const router = express.Router()

//Get all groups
router.get(('/') , (req,res)=>{
    res.json({mssg:'GET all groups'})
})

//GET a single group
router.get(('/:groupId') , (req,res)=>{
    res.json({mssg:'GET a single group'})
})

//POST new group task
router.post(('/:groupId/') , (req,res)=>{
    res.json({mssg:'POST a new group task'})
})

//UPDATE task status
router.patch(('/:groupId/:groupTaskId') , (req,res)=>{
    res.json({mssg:'UPDATE a task status'})
})

//DELETE a group task
router.delete(('/:groupId/:groupTaskId') , (req,res)=>{
    res.json({mssg:'DELETE a group task'})
})

//Post new group
router.post(('/') , async (req,res)=>{
    const {title, members} = req.body
    const tasks = []
    try{
        const group = await Group.create({title, members, tasks})
        res.status(200).json(group)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

//DELETE group
router.delete(('/:groupId') , (req,res)=>{
    res.json({mssg:'DELETE a group'})
})


module.exports = router