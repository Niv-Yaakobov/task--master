require('dotenv').config() // environment variables package

const express = require('express')
const mongoose = require('mongoose') // Mongodb helper

const {createUser, loginUser , getUserInfo} = require('./controllers/userController')

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
app.post('/signUp' , createUser)
app.post('/login' , loginUser)
app.post('/info', getUserInfo)


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

