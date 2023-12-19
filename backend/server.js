require('dotenv').config() // environment variables package

const express = require('express')
const mongoose = require('mongoose') // Mongodb helper

const User = require('./models/userModel')

const tasksRoutes = require('./routes/tasks')
const listsRoutes = require('./routes/lists')
const groupsRoutes = require('./routes/groups')


//create app
const app = express()



//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})


//routes
app.get('/' , (req,res) =>{
    res.json({mssg:'home page'})
})
app.post('/signUp' , async (req,res) => {
    const {mail , password} = req.body
    const tasks = []
    const lists= []
    const groups = []
    try{
        const user = await User.create({mail,password,tasks,lists,groups})
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

app.use(('/tasks'), tasksRoutes)
app.use(('/lists'), listsRoutes)
app.use(('/groups'), groupsRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {

        //listen for requests
        app.listen(process.env.PORT, () =>{
        console.log('connected to the db & listening on port', process.env.PORT);
        });
    })
    .catch((error) =>{
        console.log(error)
    })

