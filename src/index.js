const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')

require('./db/mongoose') // ensures that the file (mongodb.js) runs and connects to the database


const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // ensures express parses all json that is passed to the application

// 1. Create User - Promise Chain Style

// app.post('/users', (req,res) => {
    
//     // client sends json data to the endpoint and we store it in a new object
//     const user = new User(req.body) 

//     // create the new user by saving the data supplied by the request to the database
//     user.save().then(() => {

//         // if successful send back the user object that was just created
//         res.send(user)
//     }).catch((e) => {

//         // if there is an error, set the status code to "400"
//         // and send the error back to the client
//         res.status(400).send(e)
//     })
// })

// 1. Create User - Async/Await Style

app.post('/users', async (req,res) => { // Step 1: Mark function as "async"
    
    const user = new User(req.body) 

    try { // Step  3: Wrap async task in a try/catch for a more natural syntactical feel
        const result = await user.save() // Step 2: Create a variable for the async task we want to perform
        
        // if there is a result then that means we were successful
        // send the result back to the user
        if(result) {
            res.status(201).send(result)
        }
        // if we don't get a result, that means we failed
        // send the error back to the client
    } catch(e) {
        res.status(400).send(e)
    }
})

// 2. Get All Users - Promise Chain Style

// app.get('/users', (req,res) => {

//     User.find({}).then((users) => { // empty object {} returns "all" users found
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })

// })

// 2. Get All Users - Async/Await Style

app.get('/users', async (req,res) => {

        try {
           const user = await User.find({})
           res.send(user)

        } catch (e) {
            res.status(500).send()
        }
})

// 3. Get User By ID - Promise Chain Style

// set a dynamic value to accept user ID from the user
// app.get('/users/:id', (req,res) => {

//     const _id = req.params.id // access and save the value passed in
    
//     User.findById(_id).then((user) => { // pass that value to findById method

//         // if no records are returned
//         // exit the function and return "Not Found" error to the client
//         if(!user) {
//             return res.status(400).send()
//         }

//         // if successful
//         // send user data to the client
//         res.send(user)
//     }).catch((e) => {

//         // if there is a server side error (e.g. database failure)
//         // return "500" error code to client
//         res.status(500).send()
//     })
// })


// 3. Get User By ID - Async/Await Style

app.get('/users/:id', async (req,res) => {

    const _id = req.params.id // access and save the value passed in
    
    try {
        const user = await User.findById(_id)
        
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// 4. Create Task - Promise Chaining Style

// app.post('/tasks', (req,res) => {
    
//     const task = new Task(req.body) 

//     task.save().then(() => {
//         res.status(201).send(task) // changed response code to "201" (resource created)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

// 4. Create Task - Async/Await Style

app.post('/tasks', async (req,res) => {
    
    const task = new Task(req.body) 

    try {
        const result = await task.save()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send()
    }
 
})

// 5. Get All Tasks - Promise Chaining Style

// app.get('/tasks', (req,res) => {
    
//     Task.find({}).then((task) => {
//         res.send(task)
//     }).catch(() => {
//         res.status(500).send()
//     })
// })


// 5. Get All Tasks - Async/Await Style

app.get('/tasks', async (req,res) => {

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)

    } catch (e) {
        res.status(500).send()
    }
})

// 6. Get Task By ID - Promise Chaining Style

// app.get('/tasks/:id', (req,res) => {

//     const _id = req.params.id

//     Task.findById(_id).then((task) => {
//         if(!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// 6. Get Task By ID - Async/Await Style

app.get('/tasks/:id', async (req,res) => {

    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})