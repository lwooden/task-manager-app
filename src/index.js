const express = require('express')
const userRouter = require('./routes/userRoutes')
const taskRouter = require('./routes/taskRoutes')

require('./db/mongoose') // ensures that the file (mongodb.js) runs and connects to the database

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // ensures express parses all json that is passed to the application

app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})