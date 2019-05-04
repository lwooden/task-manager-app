// CRUD - Create Update and Delete

const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

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


    db.collection('tasks').insertMany([
            {
            taskDescr: 'Go to Sams club',
            isCompleted: false
        }, {
            taskDescr: 'Finish Mongodb section on Udemy',
            isCompleted: false
        }, {
            taskDescr: 'Eat a pack of apple slices',
            isCompleted: true
        }], (error, result) => {
            if(error) {
                console.log('Bulk insert opertaion failed!')
            }
            console.log(result.ops)
        })

})
