const express = require('express') // Require Express Module
const Task = require('../models/task') // Bring over the model for this resource
const auth = require('../middleware/auth')

const router = new express.Router() // Create the new Router instance


// 1. Create Task - Async/Await Style

router.post('/tasks', auth, async (req,res) => {
    
    // const task = new Task(req.body) 

    const task = new Task({
        ...req.body, // ES6 method for copying all properties from the request body to this object
        owner: req.user._id
    })


    try {
        const result = await task.save()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send()
    }
 
})

// 2. Get All Tasks - Async/Await Style

// GET /tasks?isCompleted=false
// GET /tasks?limit=2&skip=10
// GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req,res) => {

    match = {} // empty match object because the client may or may not provide match criteria
    sort = {} // empty match object because the client may or may not provide sort criteria

    if (req.query.isCompleted) { // pull value from the query string in the request if one is provided
        match.isCompleted = req.query.isCompleted === 'true' // configure match object 
    }

    if (req.query.sortBy) { // pull value from the query string in the request if one is provided
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 // ternary operator: if the condition is true then the value is set to after the ?. If the condition is false then the value is set to after the :
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({ 
            // refactor populate function by passing in a object for filtering results based on a match criteria
            path: 'tasks',
            match: match, // use match object
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
                // sort: {
                //     createdAt: 1, // -1 = desc | 1 = ascend
                //     isCompleted: -1
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)

    } catch (e) {
        res.status(500).send()
    }
})

// 3. Get Task By ID - Async/Await Style

router.get('/tasks/:id', auth, async (req,res) => {

    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user_id })

        if (!task) {
            res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
})


// 4. Update Task By ID - Async/Await Style

router.patch('/tasks/:id', auth, async (req,res) => {
    
    // const _id = req.params.id // access and save the value passed in
    const updates = Object.keys(req.body) // stores all of the keys passed in req.body in a new array object
    const allowedUpdates = ['taskDescr', 'isCompleted'] // array that defines what keys we will allowed to be updated
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
 

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const task = await Task.findOneAndUpdate(_id, req.body, { new: true, runValidators: true }) 
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id }) 
        
        if (!task) {
            return res.status(404).send()
        }

        // every() takes a callback as it's only argument
        // for every item in the updates array check to see if that value is included in the allowedUpdates array
        // returns a boolean (true or false)
        updates.forEach((update) => task[update] = req.body[update]) 
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// 5. Delete Task By ID - Async/Await Style

router.delete('/tasks/:id', auth, async (req,res) => {

   // const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })

    if(!task) {
        res.status(404).send()
    }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// 1. Create Task - Promise Chaining Style

// router.post('/tasks', (req,res) => {
    
//     const task = new Task(req.body) 

//     task.save().then(() => {
//         res.status(201).send(task) // changed response code to "201" (resource created)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })


// 2. Get All Tasks - Promise Chaining Style

// router.get('/tasks', (req,res) => {
    
//     Task.find({}).then((task) => {
//         res.send(task)
//     }).catch(() => {
//         res.status(500).send()
//     })
// })



// 3. Get Task By ID - Promise Chaining Style

// router.get('/tasks/:id', (req,res) => {

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




module.exports = router