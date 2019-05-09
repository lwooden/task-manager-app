const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true
 })

// Create the Model - this is similar to creating a "Class"

const User = mongoose.model('User', { 
     name: { // Properties of the "User" object/class
         type: String // constructor functions in javascript
     },
     age: {
         type: Number
     }
  })

const Task = mongoose.model('Task', {
    taskDescr: {
        type: String
    },
    isCompleted: {
        type: Boolean
    }
})



// Create an Instance of the Model

// const me = new User({
//     name: "John",
//     age: 'Low'
// })

const newTask = new Task({
    taskDescr: "Take out the trash",
    isCompleted: false
})

// Save the Instance of the Model to the database

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error._message)
// })

newTask.save().then(() => {
    console.log(newTask)
}).catch((error) => {
    console.log('Error: ', error)
})