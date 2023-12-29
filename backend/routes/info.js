const express = require('express')
const {getUserInfo,getTasks,getListsInfo,getGroupsInfo,getSingleList,
        getSingleGroup,deleteTask,deleteListItem,toggleItemStatus,toggleTaskImportance} = require('../controllers/infoController')
const router = express.Router()


router.get('/:userId/info' , getUserInfo)
    
//-------------------------------------tasks--------------------------------------------------------------

//GET all tasks
router.get('/:userId/tasks' , getTasks)

//Post new task
router.post('/:userId/tasks', (req,res)=>{
    res.json({mssg:'POST a new task'})
})
//UPDATE task importance
router.patch(('/:userId/tasks/:taskId') , toggleTaskImportance)

//DELETE task
router.delete(('/:userId/tasks/:taskId') ,deleteTask)

//-------------------------------------lists--------------------------------------------------------------

//GET all lists' ids and title
router.get('/:userId/lists' , getListsInfo)


//GET a single list
router.get(('/:userId/lists/:listId') , getSingleList)

//POST new item to list
router.post(('/:userId/lists/:listId') , (req,res)=>{
    res.json({mssg:'POST a new item'})
})

//UPDATE item status
router.patch(('/:userId/lists/:listId/:itemId') , toggleItemStatus)

//DELETE a item in a list
router.delete(('/:userId/lists/:listId/:itemId') ,deleteListItem)

//Post new list
router.post(('/:userId/lists/') , (req,res)=>{
    res.json({mssg: 'POST new list'})
})

//DELETE list
router.delete(('/:userId/lists/:listId') , (req,res)=>{
    res.json({mssg:'DELETE a list'})
})

//-------------------------------------groups--------------------------------------------------------------

//GET all groups' ids and title
router.get('/:userId/groups' , getGroupsInfo)


//GET a single group - from Groups collection
router.get(('/:userId/groups/:groupId') , getSingleGroup)

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