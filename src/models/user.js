const mongoose = require('mongoose')
const validator = require('validator')


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

module.exports = User