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
            unique: true, // tells MongoDB to create an index for email to ensure it is unique
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

// define a method for the UserSchema to use 
userSchema.statics.findByCredentials = async (email, password) => {

    // perform async operation to find the user account using email address
    // and store the user object 
    const user = await User.findOne({ email })
    
    // if the user isn't in the database, inform the user
    if (!user) { 
        throw new Error("Unable to login")
    }

    // if successful compare the plaintext password passed in
    // the request body to the value we have in the database
    const isMatch = await bcrypt.compare(password, user.password)

    // if the cleartext password does not match the hash value
    // inform the user
    if (!isMatch) {
        throw new Error("Unable to login")
    }

    return user
}

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