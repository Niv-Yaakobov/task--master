const mongoose = require('mongoose')

const groupTaskSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: false,
    },
    assigned: {
        type: String,
        default: '',
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
const groupSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    tasks:{
        type: [groupTaskSchema.schema], // Array of embedded groupTasks
        default:[],
        required:true,
    },
    members:{
        type: Array,
        required:true,
    }
}, {timestamps: true})

module.exports = {
    Group: mongoose.model('Group', groupSchema),
    GroupTask: mongoose.model('GroupTask', groupTaskSchema)
  };