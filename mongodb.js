// CRUD - Create Update and Delete

// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require('mongodb') // destructure mongodb module import; list the objets I want to use

id = new ObjectID
console.log(id)
console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017' // the server uri where the db is being served up
const databaseName = 'task-manager' // name of the document I want to create


MongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error, client) => { 
// in this function either I am going to get an "error" or a "client" session is going to be invoked. It will never be both. 
// this works similar to the "request" framework

    // Error Handling - if a connection is not established, inform the user;
    // "return" forces the application to exit the function
    if(error) {
        return console.log('Unable to connect to database!')
    }

    console.log('Connection successfully established!')

    const db = client.db(databaseName)

    // Single Insertion
    // db.collection('users').insertOne({
    //     name: 'E',
    //     age: 28
    // }, (error, result) => { // Here I added to callback function to the function above

    //     // if the above operation fails, notify the user
    //     if(error) {
    //         console.log('Insert Operation Failed!')
    //     }
    //     // else if the operation succeeds, present the user with the results of the operation
    //     console.log(result.ops)
    // }) 
    
    // Bulk Insertion
    // db.collection('users').insertMany([
    //     {
    //     name: 'Low Jr',
    //     age: 6
    // }, {
    //     name: 'Mom'
    // }], (error, result) => {
    //     if(error) {
    //         console.log('Bulk insert opertaion failed!')
    //     }
    //     console.log(result.ops)
    // })


    // db.collection('tasks').insertMany([
    //         {
    //         taskDescr: 'Go to Sams club',
    //         isCompleted: false
    //     }, {
    //         taskDescr: 'Finish Mongodb section on Udemy',
    //         isCompleted: false
    //     }, {
    //         taskDescr: 'Eat a pack of apple slices',
    //         isCompleted: true
    //     }], (error, result) => {
    //         if(error) {
    //             console.log('Bulk insert opertaion failed!')
    //         }
    //         console.log(result.ops)
    //     })

    // Find Single Occurence

    // db.collection('tasks').findOne({ _id: new ObjectID('5ccda26348b0cc7785584a65') }, (error, docs) => {
    //     console.log(docs)
    // })

    // db.collection('users').findOne({ name: 'Low'}, (error, docs) => {
    //     console.log(docs)
    // })

    // Find Multiple Occurences

    // db.collection('tasks').find({ isCompleted: false }).toArray((error, docs) => {
    //     console.log(docs)
    //  })


    // Single Update

    //const updatePromise
    // updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5ccd9680763103751d62c408')
    // }, {
    //     $set: {
    //         name: "Lowell"

    //     } // chaining the then and catch methods of the promise instead of creating another function block (below)
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // Bulk Update

    isCompletePromise = db.collection('tasks').updateMany({
        isCompleted: false // find every task in the document that is marked as incomplete (false)
    }, {
        $set: {
            isCompleted: true // mark it as completed (true)

        } // promise handler methods (error handling)
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
    
})
