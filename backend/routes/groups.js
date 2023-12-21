const express = require('express')

const router = express.Router()


//GET a single group - from Groups collection
router.get(('/:groupId') , (req,res)=>{
    res.json({mssg:'GET a single group'})
})

//POST new group task - to Groups collection and Users collection
router.post(('/:groupId') , (req,res)=>{
    res.json({mssg:'POST a new group task'})
})

//UPDATE task status - to Groups collection
router.patch(('/:groupId/:groupTaskId') , (req,res)=>{
    res.json({mssg:'UPDATE a task status'})
})

//DELETE a group task - to Groups collection
router.delete(('/:groupId/:groupTaskId') , (req,res)=>{
    res.json({mssg:'DELETE a group task'})
})

//Post new group - to Groups collection and Users collection
router.post(('/') , async (req,res)=>{
    res.json({mssg:'POST a group'})
})

//DELETE group - from Groups collection and Users collection
router.delete(('/:groupId') , (req,res)=>{
    res.json({mssg:'DELETE a group'})
})


module.exports = router