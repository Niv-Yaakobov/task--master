const express = require('express')
const {getUserInfo} = require('../controllers/infoController')
const router = express.Router()


router.get('/:userId/info' , getUserInfo)
    
//-------------------------------------tasks--------------------------------------------------------------

//Post new task
router.post(('/:userId/tasks') , (req,res)=>{
    res.json({mssg:'POST a new task'})
})

//DELETE task
router.delete(('/:userId/tasks/:taskId') , (req,res)=>{
    res.json({mssg:'DELETE a new task'})
})

//-------------------------------------lists--------------------------------------------------------------


//GET a single list
router.get(('/:userId/lists/:listId') , (req,res)=>{
    res.json({mssg:'GET a single list'})
})

//POST new item to list
router.post(('/:userId/lists/:listId') , (req,res)=>{
    res.json({mssg:'POST a new item'})
})

//UPDATE item status
router.patch(('/:userId/lists/:listId/:itemId') , (req,res)=>{
    res.json({mssg:'UPDATE a item status'})
})

//DELETE a item
router.delete(('/:userId/lists/:listId/:itemId') , (req,res)=>{
    res.json({mssg:'DELETE a item'})
})

//Post new list
router.post(('/:userId/lists/') , (req,res)=>{
    res.json({mssg: 'POST new list'})
})

//DELETE list
router.delete(('/:userId/lists/:listId') , (req,res)=>{
    res.json({mssg:'DELETE a list'})
})

//-------------------------------------groups--------------------------------------------------------------


//GET a single group - from Groups collection
router.get(('/:userId/groups/:groupId') , (req,res)=>{
    res.json({mssg:'GET a single group'})
})

//POST new group task - to Groups collection and Users collection
router.post(('/:userId/groups/:groupId') , (req,res)=>{
    res.json({mssg:'POST a new group task'})
})

//UPDATE task status - to Groups collection
router.patch(('/:userId/groups/:groupId/:groupTaskId') , (req,res)=>{
    res.json({mssg:'UPDATE a task status'})
})

//DELETE a group task - to Groups collection
router.delete(('/:userId/groups/:groupId/:groupTaskId') , (req,res)=>{
    res.json({mssg:'DELETE a group task'})
})

//Post new group - to Groups collection and Users collection
router.post(('/:userId/groups/') , (req,res)=>{
    res.json({mssg:'POST a group'})
})

//DELETE group - from Groups collection and Users collection
router.delete(('/:userId/groups/:groupId') , (req,res)=>{
    res.json({mssg:'DELETE a group'})
})

module.exports = router