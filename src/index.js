const express = require('express')
const userRouter = require('./routes/userRoutes') // import userRoutes file
const taskRouter = require('./routes/taskRoutes') // import taskRoutes file

require('./db/mongoose') // ensures that the file (mongodb.js) runs and connects to the database

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // ensures express parses all json that is passed to the application

app.use(userRouter) // enable user routes
app.use(taskRouter) // enable task routes


app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})