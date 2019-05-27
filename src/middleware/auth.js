const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
   try {
       // access the value passed in via the header and store it 
       // strip off the "Bearer " text so we can validate it successfully
       const token = req.header('Authorization').replace('Bearer ', '') 
       console.log(token)

       const decoded = jwt.verify(token, '1234')
       const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
       
       if(!user) {
           throw new Error()
       }

       req.user = user
       next()
   } catch (e) {
       res.status(401).send({ error: "Please authenticate!" })
   }
}

module.exports = auth