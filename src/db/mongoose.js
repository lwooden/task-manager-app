const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true
 })

// Create the Model - this is similar to creating a "Class"

const User = mongoose.model('User', { 
     name: { // Properties of the "User" object/class
        
        // constructor functions in javascript
        // Attributes or characteristics of the properties associated with this object
        // Data Sanitization
         type: String, 
         required: true,
         trim: true
     },
     email: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,

         // Data Validation
         validate(value) {
             if (!validator.isEmail(value)) {
                 throw new Error("Please insert a valid email address!")
             }
         }
     },
     age: {
         type: Number,
         default: 0,
         validate(value) {
             if (value < 0) {
                 throw new Error('Age must be a positive number!')
             }
         }
     },
     password: {
         type: String,
         required: true,
         trim: true,
         minlength: 7,
         validate(value) {
             if (value.toLowerCase().includes('password')) {
                 throw new Error('Password must not contain the word "password"!')
            }
         }
      }
 })

const Task = mongoose.model('Task', {
    taskDescr: {
        type: String,
        required: true,
        trim: true
        
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})



// Create an Instance of the Model

// const me = new User({
//     name: "   Low    ",
//     email: "LOW@low.com",
//     password: "low"
// })

const newTask = new Task({
    //taskDescr: "Mow the lawn",
    
})

// Save the Instance of the Model to the database

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error.message)
// })

newTask.save().then(() => {
    console.log(newTask)
}).catch((error) => {
    console.log('Error: ', error)
})