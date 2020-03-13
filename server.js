const express = require('express')
const app = express()
const config = require('./config')
const mongoose = require('mongoose')


//database initialisation


// mongoose.connect(`mongodb://${config.database.url}/${config.database.name}`)
//     .then(()=> {
//         console.log('successfully established connection to the db')
//     })
//     .catch(() => {
//         console.log('connection error')
//     })

// // mongo schema creation
// let userSchema = new mongoose.Schema({
//     user_id: 
// })



app.listen(config.SERVER_PORT, ()=>{console.log('server started on port '+ config.SERVER_PORT)})