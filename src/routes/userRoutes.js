const express = require('express') // Require Express Package
const User = require('../models/user') // Bring over the model for this resource
const auth = require('../middleware/auth')


const router = new express.Router() // Create the new Router instance



// 1. Create User - Async/Await Style

router.post('/users', async (req,res) => { // Step 1: Mark function as "async"
    
    const user = new User(req.body) 

    try { // Step  3: Wrap async task in a try/catch for a more natural syntactical feel

        const result = await user.save() // Step 2: Create a variable for the async task we want to perform
        const token = await user.generateAuthToken()
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

// 2. Get All Users - Async/Await Style

router.get('/users', auth, async (req,res) => { // added "auth" as the 2nd argument so our middleware will run "before" the route suite is called

        try {
           const user = await User.find({})
           res.send(user)

        } catch (e) {
            res.status(500).send()
        }
})

// Get Authenticated Users Profile Only (Not All Users)

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})


// Log Out

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Log Out All

router.post('/users/logoutall', auth, async (req, res) => {
    
    try {
        req.user.tokens = [] // set tokens array to be empty so all tokens will be removed
        await req.user.save() // save the user profile with the now deleted tokens
        res.send() // send back a 200 status code
    } catch (e) {
        res.status(500).send()
    }
})


// 3. Get User By ID - Async/Await Style

router.get('/users/:id', async (req,res) => {

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

// 4. Update User By ID - Async/Await Style

router.patch('/users/:id', async (req,res) => {

    const _id = req.params.id // access and save the value passed in
    const updates = Object.keys(req.body) // stores all of the keys passed in req.body in a new array object
    const allowedUpdates = ["name", "email", "age", "password"] // array that defines what keys we will allowed to be updated
    
    // every() takes a callback as it's only argument
    // for every item in the updates array check to see if that value is included in the allowedUpdates array
    // returns a boolean (true or false)
    const isValid = updates.every((update) => allowedUpdates.includes(update)) 

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try {

        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        // const user = await User.findOneAndUpdate(_id, req.body, { new: true, runValidators: true }) 
        
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// 5. Delete User By ID - Async/Await Style

router.delete('/users/me', auth, async (req,res) => {

    try {
        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// 6. User Login - Async/Await Style

router.post('/users/login', async (req, res) => {
    try {
        // calls function defined in User Model file 
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        // if successful, returns the user back to the client
        res.send({ user, token  })
    } catch (e) {
        res.status(400).send()
    }

})


// 1. Create User - Promise Chain Style

// router.post('/users', (req,res) => {
    
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


// 2. Get All Users - Promise Chain Style

// router.get('/users', (req,res) => {

//     User.find({}).then((users) => { // empty object {} returns "all" users found
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })

// })




// 3. Get User By ID - Promise Chain Style

// set a dynamic value to accept user ID from the user
// router.get('/users/:id', (req,res) => {

//     const _id = req.params.id // access and save the value passed in
    
//     User.findById(_id).then((user) => { // pass the ID value to findById method

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


module.exports = router