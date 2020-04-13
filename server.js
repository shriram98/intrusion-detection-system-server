const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config')
const fs = require('fs')

const model = require('./middlewares/model')
// const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

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

app.post('/detect',model , function(req, res) {

    console.log("\nProcessing request..\n")

    res.send('success')
})


app.listen(config.SERVER_PORT, ()=>{console.log('server started on port '+ config.SERVER_PORT)})
