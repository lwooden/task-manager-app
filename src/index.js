const app = require("./app")

// const express = require('express')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const userRouter = require('./routes/userRoutes') // import userRoutes file
// const taskRouter = require('./routes/taskRoutes') // import taskRoutes file
// require('./db/mongoose') // ensures that the file (mongodb.js) runs and connects to the database

// const app = express()
const port = process.env.PORT // || 3000 is no longer needed because of dev.env file

// app.use(express.json()) // ensures express parses all json that is passed to the application
// app.use(userRouter) // enable user routes
// app.use(taskRouter) // enable task routes

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})


// <------  File Upload(Multer) Example ------> 
// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })


// <------  Populate Example ------> 
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {

//     // Find User by Task
//     const task = await Task.findById('5d0fd66e5615e72917d71bc3')
//     await task.populate('owner').execPopulate() // uses the ref statement to retrieve the User who created the task
//     console.log(task.owner)
    
//     // Find Task by User
//     const user = await User.findById('5d0fd3e1a209d827e9b2a3b3')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()
// <------  Populate Example ------> 


// Without Middleware:  new request -> execute route handler
//
// With Middleware:     new request -> do something -> execute route handler

// <------  Express Middleware Examples ------> 
// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next() // tells the program to move on to the next piece of logic (executing the route)

//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     // temporarily disables all routes and sends msg to user
//     res.status(503).send('Site currently under construction') 
// })
// <------  Express Middleware Examples ------> 



// <------  JsonWebToken Example ------> 
// const myFunction2 = async () => {

//     var token = jwt.sign("I love the Lord", "1234" )
//     console.log("Your token:", token)

//     var data = jwt.verify(token, "1234")
//     console.log(data)
// }

// myFunction2()
// <------  JsonWebToken Example ------> 



// <------  Bcrypt Example ------> 
// const myPassword = "Password1"
// const anotherPassword = "Password2"
// const saltRounds = 10

// const myFunction = async () => {
//     const hashedPassword = await bcrypt.hash(myPassword, 8)
//     const isMatch = await bcrypt.compareSync(myPassword, hashedPassword)

//     console.log(myPassword)
//     console.log(hashedPassword)

//     if (isMatch) {
//         console.log('Login successful!')
//     } else {
//         console.log('Login failed!')
//     }
// }

// myFunction()
// <------  Bcrypt Example ------> 




