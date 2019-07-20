const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')


const testUserId = new mongoose.Types.ObjectId() // create ObjectID for test user ahead of time
const testUser = {
    _id: testUserId, // reference it 
    name: 'John Doe',
    email: 'lwooden20@gmail.com',
    password: 'sheldonave',
    tokens: [{
        token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET) // create token using precreated ObjectID 
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(testUser).save()
}

// Export these variables/functions so I can use them in other files
module.exports = {
    testUserId,
    testUser,
    setupDatabase
}