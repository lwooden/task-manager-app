const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// The goal for this file is too:
// 1. Define functions that can be executed when the user does something (sign up, deletes account, etc)
// 2. Export each function in this file so we can call the functions in the routes file
// 3. Isolate the code for handling email in it's own file for better structure and organization

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lowell.wooden@gmail.com',
        subject: 'Welcome to Task Manager!',
        text: `Welcome to the app, ${name}! Let us know how we can assist you!`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lowell.wooden@gmail.com',
        subject: 'Sorry to See You Go :(',
        text: `Hey ${name}! We noticed that you choose to delete your account. We are terribly sorry to see you go. Is there anything we can do to improve so that this doesn't happen again?`

    })
}


// sgMail.send({
//     to: 'lowell.wooden@gmail.com',
//     from: 'lowell.wooden@gmail.com',
//     subject: 'My First Dev Email',
//     text: 'Hope this makes it to you!'
// })


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}