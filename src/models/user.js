const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

// insert the model and it's properties into a schema so we can take advantage of middleware
const userSchema = mongoose.Schema({
    
    // Properties of the "User" object/class
    name: { 
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

// define the actions that will take place before(pre) saving to the database
userSchema.pre('save', async function(next) {

    const user = this 

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() // tells the program to move to the next opertation which is to save to the database

})

const User = mongoose.model('User', userSchema)

module.exports = User