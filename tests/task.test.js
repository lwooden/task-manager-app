const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { testUserId, testUser, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)


test('Should create a task for a user', async () => {

})