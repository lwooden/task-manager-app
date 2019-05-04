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

    db.collection('users').insertOne({
        name: 'Low',
        age: 28
    })

    console.log('Data inserted')

})
