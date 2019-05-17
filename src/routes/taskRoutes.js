const express = require('express') // Require Express Module
const Task = require('../models/task') // Bring over the model for this resource

const router = new express.Router() // Create the new Router instance

// 3. Update Task By ID - Async/Await Style

router.patch('/tasks/:id', async (req,res) => {
    
    const _id = req.params.id // access and save the value passed in
    const updates = Object.keys(req.body) // stores all of the keys passed in req.body in a new array object
    const allowedUpdates = ["taskDescr, isCompleted"] // array that defines what keys we will allowed to be updated
    
    // every() takes a callback as it's only argument
    // for every item in the updates array check to see if that value is included in the allowedUpdates array
    // returns a boolean (true or false)
    const isValid = updates.every((update) => allowedUpdates.includes(update)) 

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOneAndUpdate(_id, req.body, { new: true, runValidators: true }) 
        
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {

    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

    if(!task) {
        res.status(404).send()
    }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// 4. Create Task - Promise Chaining Style

// router.post('/tasks', (req,res) => {
    
//     const task = new Task(req.body) 

//     task.save().then(() => {
//         res.status(201).send(task) // changed response code to "201" (resource created)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

// 4. Create Task - Async/Await Style

router.post('/tasks', async (req,res) => {
    
    const task = new Task(req.body) 

    try {
        const result = await task.save()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send()
    }
 
})

// 5. Get All Tasks - Promise Chaining Style

// router.get('/tasks', (req,res) => {
    
//     Task.find({}).then((task) => {
//         res.send(task)
//     }).catch(() => {
//         res.status(500).send()
//     })
// })


// 5. Get All Tasks - Async/Await Style

router.get('/tasks', async (req,res) => {

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)

    } catch (e) {
        res.status(500).send()
    }
})

// 6. Get Task By ID - Promise Chaining Style

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

// 6. Get Task By ID - Async/Await Style

router.get('/tasks/:id', async (req,res) => {

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


module.exports = router