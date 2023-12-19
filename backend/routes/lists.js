const express = require('express')

const List = require('../models/listModel')

const router = express.Router()

//Get all lists
router.get(('/') , (req,res)=>{
    res.json({mssg:'GET all lists'})
})

//GET a single list
router.get(('/:listId') , (req,res)=>{
    res.json({mssg:'GET a single list'})
})

//POST new item
router.post(('/:listId/') , (req,res)=>{
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
    const listItems = []
    const {title} = req.body
    try{
        const list = await List.create({title, listItems})
        res.status(200).json(list)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

//DELETE list
router.delete(('/:listId') , (req,res)=>{
    res.json({mssg:'DELETE a list'})
})



module.exports = router