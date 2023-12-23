require('dotenv').config() // environment variables package

const express = require('express')
const mongoose = require('mongoose') // Mongodb helper

const {createUser, loginUser} = require('./controllers/infoController')

const routes = require('./routes/info')



//create app
const app = express()



//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})


//routes

app.post('/signUp' , createUser)
app.post('/login' , loginUser)

app.use('/' ,routes )


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

