const express = require('express')

const router = express.Router()


//Post new task
router.post(('/') , (req,res)=>{
    res.json({mssg:'POST a new task'})
})

//DELETE task
router.delete(('/:id') , (req,res)=>{
    res.json({mssg:'DELETE a new task'})
})

module.exports = router