const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reminder: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('tasks', taskSchema)