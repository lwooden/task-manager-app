const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { testUserId, testUser, setupDatabase } = require('./fixtures/db')


// const testUserId = new mongoose.Types.ObjectId() // create ObjectID for test user ahead of time
// const testUser = {
//     _id: testUserId, // reference it 
//     name: 'John Doe',
//     email: 'lwooden20@gmail.com',
//     password: 'sheldonave',
//     tokens: [{
//         token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET) // create token using precreated ObjectID 
//     }]
// }

const invalidUser = {
    name: "Bad User",
    email: "bad@gmail.com",
    password: 'helloworld'
}

// beforeEach(async () => { 
//     // 1. Clear the user database before each test is run so we start on a clean slate
//     // 2. Create a test user that is stored for other future test
//     await User.deleteMany()
//     await new User(testUser).save()
// })

beforeEach(setupDatabase)

// Testing the Creation of Data
test("Should signup a new user", async () => {
    const response = await request(app).post('/users').send({ // save the response and use it for further testing below
        name: "Lowell Wooden",
        email: "lowell.wooden@gmail.com",
        password: "sheldonave"
    }).expect(201)
    // console.log(response)

    // (Assert) Check to see if the database change correctly
    const user = await User.findById(response.body._id)
    // console.log(user)
    // console.log(user.name)
    expect(user).not.toBeNull() // expect the user to be in the database (not a null reference)

    // (Assert) Check the details of the response
    expect(response.body.name).toBe('Lowell Wooden')
})

// Testing Existing Data
test('Should login a user', async () => {
    await request(app).post('/users/login').send({
        email: testUser.email,
        password: testUser.password
    }).expect(200)
})

test('Should not login in invalid user', async () => {
    await request(app).post('/users/login').send({
        email: invalidUser.email,
        password: invalidUser.password
    }).expect(400)
})


test('Should get user profile back', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`) // make sure test is with an authenticated user
        .send()
        .expect(200)
})

test('Should not get profile for a unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete a profile', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization',  `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200)

    // (Assert) Check if the user was really deleted from the database
    const user = await User.findById(testUserId)
    // console.log(user)
    expect(user).toBeNull()
})


test('Should not delete a profile for a unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload a avatar image file', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',  `Bearer ${testUser.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg') // upload image to the application
    .expect(200)

    // (Assert) Check if the binary data was in fact received by the application
    const user = await User.findById(testUserId)
    expect({}).toEqual({}) // comparing 2 objects using toBe fails b/c even though they have the same properties they are different in memory
    expect(user.avatar).toEqual(expect.any(Buffer)) // using toEqual ensures that only the properties of each object are compared and not their location in memory
})

// Testing Modififcation of Data
test('Should update a user field', async () => {
    await request(app)
    .patch('/users/me') // use patch for updating
    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
    .send({ // change the name field of the user object
        name: 'Lowell Wooden'
    })
    .expect(200)
})

test('Should not update an invalid field', async () => {
    await request(app)
    .patch('/users/me') // use patch for updating
    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
    .send({ // change the value of a field that doesnt exists
        location: 'Maryland'
    })
    .expect(400)
})