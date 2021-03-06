const express = require('express') // Require Express Package
const User = require('../models/user') // Bring over the model for this resource
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account') // object destructuring

const router = new express.Router() // Create the new Router instance

const avatar = multer({ // options object to provide filtering and validation to what the serve receives
    // dest: 'avatars', // remove dest so multer can pass it's data to the route handler
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {

        // use originalname API to check the file name and its extension
        // if it does not end with pdf, throw error

        // if (!file.originalname.endsWith('.pdf')) { // satisfies one condition
        //     return callback(new Error('Please upload a PDF!'))
        // }

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // wraps multiple conditions in one regex expression
            return callback(new Error('Please upload an image file for your avatar!'))
        }
        // if it does, process the upload
        callback(undefined, true)

        // callback(new Error('File must be a PDF'))
        // callback(undefined, true)
        // callback(undefined, false)
    }
})


// Create/Update Avatar - Async/Await Style

router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res) => {
    
    const buffer = await sharp(req.file.buffer).resize({ width:250, height:250 }).png().toBuffer() // pass the buffer that was stored on req.file.buffer to sharp and chain the appropriate methods to match your requirements
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save()
    res.send('User profile updated')
}, (error, req, res, next) => { // this second function attached to the route handler is defined to handle any uncaught errors
    res.send({ error: error.message }) // the error object returned is parsed as JSON
})


// Delete Avatar - Async/Await Style

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined // set avatar array to be empty so the avatar will be removed
        await req.user.save() // save the user profile with the now deleted avatar
        res.send() // send back a 200 status code
    } catch (e) {
        res.status(500).send()
    }
})

// Read/Get Avatar - Async/Await Style

router.get('/users/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById(req.params.id) // pass in the user id in the URL and use it to grab user details from the database

        if (!user || !user.avatar) { // if there is no user with that ID or the user does not have an avatar loaded throw an error
            throw new Error()
        }
        // if we do find a user
        res.set('Content-Type','image/png') // set the response header to image/jpg since we are sending back the avatar; default is application/json
        res.send(user.avatar) // send the avatar back
    } catch (e) {
        res.status(404).send
    }

})

// Create User - Async/Await Style

router.post('/users', async (req,res) => { // Step 1: Mark function as "async"
    
    const user = new User(req.body) 

    try { // Step  3: Wrap async task in a try/catch for a more natural syntactical feel

        const result = await user.save() // Step 2: Create a variable for the async task we want to perform
        sendWelcomeEmail(user.email, user.name)
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

// Get All Users - Async/Await Style

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


// Get User By ID - Async/Await Style

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

// Update User By ID - Async/Await Style

router.patch('/users/me', auth, async (req,res) => {

    const _id = req.user.id // access and save the value passed in
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

// Delete User By ID - Async/Await Style

router.delete('/users/me', auth, async (req,res) => {

    try {
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// User Login - Async/Await Style

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