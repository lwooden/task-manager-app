const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    taskDescr: {
        type: String,
        required: true,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    owner: { // creating a relationship between users and tasks for security
        type: mongoose.Schema.Types.ObjectId, // store the ID of the user who created the task
        required: true,
        ref: 'User' // create a relationship in the database between the user and task objects
    }
})

module.exports = Task