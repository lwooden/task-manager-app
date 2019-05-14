
require('../src/db/mongoose') 
const User = require('../src/models/user')
const Task = require('../src/models/task')

// Traditional Promise Chaining Style

// User.findOneAndUpdate('5cda2fe855938d40cf7f89b5', { age: 29 }).then((user) => { // 1st promise
//     console.log(user)
//     return User.countDocuments({ age: 28 }) // resolve the first promise and move to the next

// }).then((result) => { // 2nd promise
//     console.log('Number of matching documents:', result)

// }).catch((e) => {
//     console.log(e)
// })

// Async-Await Style

// const updateAgeAndCount = async (id, age) => { // define top-level function to pass values down to child functions
    
//     // establish an await funciton for each action we need to perform
//     // 1 - Find record by ID and update age
//     // 2 - Return records that match a particular age
//     const user = await User.findByIdAndUpdate(id, { age })
//     const count = await User.countDocuments({ age })
//     return { 
//         user,
//         count
//     }
// }

// updateAgeAndCount("5cd62f2709e5411e0eaa2768", 2).then((results) => {
//     console.log(results)
    
        
// }).catch((e) => {
//     console.log(e)
// })


// Traditional Promise Chaining Style

// Task.findByIdAndDelete('5cd62aa17a192f1d7280ff54').then((task) => {
//     console.log('Deleted Task:', task)
//     return Task.countDocuments({ isCompleted: false })

// }).then((result) => {
//     console.log('Number of matching documents:', result)
// }).catch((e) => {
//     console.log(e)
// })


// Async-Await Style

const deleteTaskAndCount = async (id, filter) => {
    const deletedTask = await Task.findByIdAndDelete(id)
    const remainingTasks = await Task.countDocuments({ filter })
    return {
        deletedTask,
        remainingTasks
    }

}

deleteTaskAndCount('5cd62bf805ed5c1dab8d9f49', "isCompleted: false").then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
