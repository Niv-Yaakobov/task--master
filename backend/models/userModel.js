const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    mail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    tasks:{
        type: Array,
        default:[],
        required:true,
    },
    lists:{
        type: Array,
        default:[],
        required:true,
    },
    groups:{
        type: Array,
        default:[],
        required:true,
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)