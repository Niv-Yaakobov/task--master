const User = require('../models/userModel')

// create new user
const createUser = (req,res) =>{
    const {mail, password} = req.body
    try{
        // check if user's mail is already exists
        User.findOne({mail: mail})
            .then(returnUser => {
                if (returnUser){
                    //user already exist
                    res.status(200).json({id:'0'})
                }
                else{
                    // send user Id - THE AUTHENTICATION DATA 
                    const user = User.create({mail,password}).then(user => res.status(200).json({ id : user.id}))
                }
            })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// check login authentication
const loginUser = (req,res) =>{
const {mail, password} = req.body
    try{
        // check if user credential are correct
        User.findOne({mail: mail , password:password})
            .then(user => {
                if (user){
                    // send user Id - THE AUTHENTICATION DATA 
                    res.status(200).json({id : user.id})
                }
                else{
                    res.status(200).json({ id : '0'})
                }
            })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// GET user info
const getUserInfo = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id})
        .then(user => {
            if (user){
                // sending user info
                res.status(200).json({mail : user.mail , tasks : user.tasks ,lists: user.lists , groups : user.groups})
            }
            else{
                res.status(200).json({messg: 'user does not exist'})
            }
        })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}


//-------------------------------------tasks--------------------------------------------------------------

//GET all tasks
const getTasks = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id },'tasks')
        .then(data => {
            if (data){
                // sending user info
                res.status(200).json(data.tasks)
            }
            else{
                res.status(200).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}


// Post new task

// DELETE task

//-------------------------------------lists--------------------------------------------------------------

// GET user lists information
const getListsInfo = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id },'lists._id lists.title')
        .then(data => {
            console.log(data.lists)
            if (data){
                // sending user info
                res.status(200).json(data.lists)
            }
            else{
                res.status(200).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//GET a single list
const getSingleList = (req,res) =>{
    const { userId, listId } = req.params
    console.log(userId, listId)
    try {
        //search by user id and get the lists array
        User.findOne({_id:userId },'lists')
        .then(data => {
            if (data){
                const list = data.lists.find((list) => list._id.toString() === listId)
                if(list)
                    // sending user info
                    res.status(200).json(list)
                else
                    res.status(200).json({messg: 'list does not exist'})
            }
            else{
                res.status(200).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//-------------------------------------groups--------------------------------------------------------------


// GET user groups information
const getGroupsInfo = (req,res) =>{
    const id = req.params['userId']
    try {
        //search by user id
        User.findOne({_id:id },'groups._id groups.title')
        .then(data => {
            if (data){
                // sending user info
                res.status(200).json(data.groups)
            }
            else{
                res.status(200).json({messg: 'user does not exist'})
            }
        })
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//GET a single group



module.exports = {
    createUser,
    loginUser,
    getUserInfo,
    getTasks,
    getListsInfo,
    getGroupsInfo,
    getSingleList
}