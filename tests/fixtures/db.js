const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


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

const testUserTwoId = new mongoose.Types.ObjectId() // create ObjectID for test user ahead of time
const testUserTwo = {
    _id: testUserTwoId, // reference it 
    name: 'John Black',
    email: 'lwooden25@gmail.com',
    password: 'block50',
    tokens: [{
        token: jwt.sign({ _id: testUserTwoId }, process.env.JWT_SECRET) // create token using precreated ObjectID 
    }]
}

const testTask = {
    _id: new mongoose.Types.ObjectId(),
    taskDescr: "Shop for bookshelves on Wayfair",
    owner: testUser._id
}

const testTaskTwo = {
    _id: new mongoose.Types.ObjectId(),
    taskDescr: "Go to Addidas Store",
    owner: testUserTwo._id
}

 const testTaskThree = {
     _id: new mongoose.Types.ObjectId(),
     taskDescr: "Go see Mom",
     owner: testUser._id
 }

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(testUser).save()
    await new User(testUserTwo).save()
    await new Task(testTask).save()
    await new Task(testTaskTwo).save()
    await new Task(testTaskThree).save()
}

// Export these variables/functions so I can use them in other files
module.exports = {
    testUserId,
    testUser,
    testUserTwoId,
    testUserTwo,
    testTask,
    testTaskTwo,
    setupDatabase
}