const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    tasks:{
        type: Array,
        required:true,
    },
    members:{
        type: Array,
        required:true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Group', groupSchema)