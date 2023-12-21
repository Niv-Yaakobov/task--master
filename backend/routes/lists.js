const express = require('express')

const router = express.Router()


//GET a single list
router.get(('/:listId') , (req,res)=>{
    res.json({mssg:'GET a single list'})
})

//POST new item
router.post(('/:listId') , (req,res)=>{
    res.json({mssg:'POST a new item'})
})

//UPDATE item status
router.patch(('/:listId/:itemId') , (req,res)=>{
    res.json({mssg:'UPDATE a item status'})
})

//DELETE a item
router.delete(('/:listId/:itemId') , (req,res)=>{
    res.json({mssg:'DELETE a item'})
})

//Post new list
router.post(('/') ,async (req,res)=>{
    res.json({mssg: 'POST new list'})
})

//DELETE list
router.delete(('/:listId') , (req,res)=>{
    res.json({mssg:'DELETE a list'})
})



module.exports = router