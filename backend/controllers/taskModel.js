const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    type:{
        type: Array,
        required: true
    },
    date:{
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)