const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { testUserId, testUserTwo, testTask, testTaskTwo, testUser, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)


// Testing the Creation of Data
test('Should create a task for a user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .send({
        taskDescr: "Stop by Dan Ryan Model",
        isCompleted: true
    })
    .expect(200)
    
    const task = await Task.findById(response.body._id)
    // console.log(task)
    expect(task).not.toBeNull()
    expect(task.isCompleted).toEqual(true)
})


// Testing the Reading Exisiting Data
test('Should fetch users tasks', async () => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200)

    // console.log(response.body[0]._id)
    // expect(response.body.length).toEqual(2)
})

// Testing the Deletion of Data
test('Should not be able to delete tasks of another user', async () => {
    
    const response = await request(app)
    .delete(`/tasks/${testTask._id}`) // export the task from db file to access its ID
    .set('Authorization', `Bearer ${testUserTwo.tokens[0].token}`) // login as user two to test failure
    .send()
    .expect(404)

    // Verify Task is Still in the Database
     const task = await Task.findById(testTaskTwo._id)
     expect(task).not.toBeNull()
})