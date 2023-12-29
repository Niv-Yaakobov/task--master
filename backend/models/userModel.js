const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: false,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    items: {
        type: [itemSchema.schema],  // Array of embedded items
        default:[],
        required: true,
    },
});

const taskSchema = new mongoose.Schema({
    type: {
        type: Array,
        default: [],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default:'',
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    mail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    tasks:{
        type: [taskSchema.schema], // Array of embedded tasks
        default:[],
        required:true,
    },
    lists:{
        type: [listSchema.schema],// Array of embedded lists
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