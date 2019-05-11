const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')

require('./db/mongoose') // ensures that the file (mongodb.js) runs and connects to the database


const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // ensures express parses all json that is passed to the application

app.post('/users', (req,res) => {
    
    // client sends json data to the endpoint and we store it in a new object
    const user = new User(req.body) 

    // create the new user by saving the data supplied by the request to the database
    user.save().then(() => {

        // if successful send back the user object that was just created
        res.send(user)
    }).catch((e) => {

        // if there is an error, set the status code to "400"
        // and send the error back to the client
        res.status(400).send(e)
    })
})

app.get('/users', (req,res) => {

    User.find({}).then((users) => { // empty object {} returns "all" users found
        res.send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })

})

// set a dynamic value to accept user ID from the user
app.get('/users/:id', (req,res) => {

    const _id = req.params.id // access and save the value passed in
    
    User.findById(_id).then((user) => { // pass that value to findById method

        // if no records are returned
        // exit the function and return "Not Found" error to the client
        if(!user) {
            return res.status(400).send()
        }

        // if successful
        // send user data to the client
        res.send(user)
    }).catch((e) => {

        // if there is a server side error (e.g. database failure)
        // return "500" error code to client
        res.status(500).send()
    })
})


app.post('/tasks', (req,res) => {
    
    const task = new Task(req.body) 

    task.save().then(() => {
        res.status(201).send(task) // changed response code to "201" (resource created)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req,res) => {
    
    Task.find({}).then((task) => {
        res.send(task)
    }).catch(() => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req,res) => {

    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})