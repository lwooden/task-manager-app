const mongoose = require('mongoose')

// refactor Task model and it's properties into a schema so we can take advantage of middleware
const taskSchema = mongoose.Schema({

    // Properties of the "Task" object/class
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
}, {
    timestamps: true

})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task


// const Task = mongoose.model('Task', {
//     taskDescr: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     isCompleted: {
//         type: Boolean,
//         default: false
//     },
//     owner: { // creating a relationship between users and tasks for security
//         type: mongoose.Schema.Types.ObjectId, // store the ID of the user who created the task
//         required: true,
//         ref: 'User' // create a relationship in the database between the user and task objects
//     }
// }, {
//     timestamps: true
// })

