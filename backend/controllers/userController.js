const User = require('../models/userModel')

// create new user
const createUser = (req,res) =>{
    const {mail, password} = req.body
    try{
        // check if user's mail is already exists
        User.findOne({mail: mail})
            .then(returnUser => {
                if (returnUser){
                    res.status(200).json({messg: 'mail is used'})
                }
                else{
                    const user = User.create({mail,password}).then(user => res.status(200).json(user))
                }
            })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// check login autontication
const loginUser = (req,res) =>{

const {mail, password} = req.body
    try{
        // check if user's mail is already exists
        User.findOne({mail: mail , password:password})
            .then(user => {
                if (user){
                    res.status(200).json({messg: 'confirm login'})
                }
                else{
                    res.status(200).json({messg: 'mail or password is incorrect'})
                }
            })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// GET user info
const getUserInfo = (req,res) =>{
    console.log('requesting info ')
    const { mail } = req.body
    try {
        User.findOne({mail:mail})
        .then(user => {
            if (user){
                res.status(200).json(user)
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


// POST task 

// DELETE task

// GET user groups 

// GET user lists


module.exports = {
    createUser,
    loginUser,
    getUserInfo
}