
// Where the express application can be setup and exported for testing
// Supertest does not need to call app.listen in order for it to send requests to the express application

const express = require('express')
const userRouter = require('./routes/userRoutes') // import userRoutes file
const taskRouter = require('./routes/taskRoutes') // import taskRoutes file
require('./db/mongoose') // ensures that the file (mongodb.js) runs and connects to the database

const app = express()

app.use(express.json()) // ensures express parses all json that is passed to the application
app.use(userRouter) // enable user routes
app.use(taskRouter) // enable task routes

module.exports = app