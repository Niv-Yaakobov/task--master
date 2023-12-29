const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    tasks:{
        type: Array,
        default:[],
        required:true,
    },
    members:{
        type: Array,
        default:[],
        required:true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Group', groupSchema)