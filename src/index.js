const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('./routes/userRoutes') // import userRoutes file
const taskRouter = require('./routes/taskRoutes') // import taskRoutes file
require('./db/mongoose') // ensures that the file (mongodb.js) runs and connects to the database

const app = express()
const port = process.env.PORT || 3000

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

app.use(express.json()) // ensures express parses all json that is passed to the application
app.use(userRouter) // enable user routes
app.use(taskRouter) // enable task routes

// Testing Jsonwebtoken
// const myFunction2 = async () => {

//     var token = jwt.sign("I love the Lord", "1234" )
//     console.log("Your token:", token)

//     var data = jwt.verify(token, "1234")
//     console.log(data)
// }

// myFunction2()

// Testing Bcrypt
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




app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})